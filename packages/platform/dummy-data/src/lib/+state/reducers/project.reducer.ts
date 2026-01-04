import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { ProjectLocalActions, ProjectRemoteActions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    incrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    initialRemotePaginationState,
    isNull,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface ProjectFeatureState extends BaseRemoteFeatureState {
    projects: EntityState<Model.ProjectResponse>
    selectedProjectId: Nullable<string>
    projectsRemotePagination: RemotePaginationState<Model.ProjectResponse>
    filters: Model.ProjectFilters
}

export const projectEntityAdapter: EntityAdapter<Model.ProjectResponse> = createEntityAdapter<Model.ProjectResponse>()

export const initialProjectFeatureState: ProjectFeatureState = {
    ...initialBaseRemoteFeatureState,
    projects: projectEntityAdapter.getInitialState(),
    selectedProjectId: null,
    projectsRemotePagination: initialRemotePaginationState('name'),
    filters: Model.initialProjectFilters,
}

export const projectReducer = createReducer(
    initialProjectFeatureState,
    on(ProjectLocalActions.resetProjectState, () => initialProjectFeatureState),
    on(ProjectLocalActions.initialiseProjectState, () => initialProjectFeatureState),
    on(ProjectLocalActions.updateProjectFilters, (state, { filters }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...filters,
        },
    })),
    on(ProjectLocalActions.resetProjectFilters, (state) => ({ ...state, filters: Model.initialProjectFilters })),
    on(ProjectLocalActions.selectProject, (state, { projectId }) => ({ ...state, selectedProjectId: projectId })),
    on(ProjectLocalActions.deselectProject, (state) => ({ ...state, selectedProjectId: null })),
    on(ProjectLocalActions.resetPagination, (state) => ({
        ...state,
        projectsRemotePagination: {
            ...state.projectsRemotePagination,
            offset: 0,
        },
    })),
    on(remoteStateUpdateRequest(ProjectRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(ProjectRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(ProjectRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(ProjectRemoteActions.createProject.success, (state, { response }) => ({
        ...state,
        projects: projectEntityAdapter.setOne(response, state.projects),
        projectsRemotePagination: incrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'projects',
            remotePaginationStateKey: 'projectsRemotePagination',
            ids: [response.id],
        }),
    })),
    on(ProjectRemoteActions.getProject.success, (state, { response }) => ({
        ...state,
        projects: projectEntityAdapter.setOne(response, state.projects),
        selectedProjectId: response.id,
    })),
    on(ProjectRemoteActions.listProjects.request, (state, { pagination }) => ({
        ...state,
        projectsRemotePagination: {
            ...state.projectsRemotePagination,
            ...pagination,
        },
    })),
    on(ProjectRemoteActions.listProjects.success, (state, { response }) => ({
        ...state,
        projects: projectEntityAdapter.setMany(response.results, state.projects),
        projectsRemotePagination: {
            ...state.projectsRemotePagination,
            total: response.total,
        },
    })),
    on(ProjectRemoteActions.updateProject.success, (state, { response }) => ({
        ...state,
        projects: projectEntityAdapter.updateOne({ id: response.id, changes: response }, state.projects),
    })),
    on(ProjectRemoteActions.deleteProject.success, (state, { projectId }) => ({
        ...state,
        projects: projectEntityAdapter.removeOne(projectId, state.projects),
        selectedProjectId: state.selectedProjectId === projectId ? null : state.selectedProjectId,
        projectsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'projects',
            remotePaginationStateKey: 'projectsRemotePagination',
            ids: [projectId],
        }),
    })),
    on(ProjectRemoteActions.deleteProjects.success, (state, { projectIds }) => ({
        ...state,
        projects: projectEntityAdapter.removeMany(projectIds, state.projects),
        selectedProjectId:
            !isNull(state.selectedProjectId) && projectIds.includes(state.selectedProjectId)
                ? null
                : state.selectedProjectId,
        projectsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'projects',
            remotePaginationStateKey: 'projectsRemotePagination',
            ids: projectIds,
        }),
    }))
)
