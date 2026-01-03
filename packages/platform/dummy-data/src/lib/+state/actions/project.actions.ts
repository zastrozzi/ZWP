import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const PROJECT_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_DUMMY_DATA_ACTION_IDENTIFIER,
    Identifiers.PROJECT_STATE_FEATURE_KEY,
]

const initialiseProjectState = createAction(createActionType(PROJECT_ACTION_IDENTIFIERS, 'Initialise State'))

const updateProjectFilters = createAction(
    createActionType(PROJECT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.ProjectFilters>>()
)

const resetProjectFilters = createAction(
    createActionType(PROJECT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetProjectState = createAction(createActionType(PROJECT_ACTION_IDENTIFIERS, 'Reset State'))

const selectProject = createAction(
    createActionType(PROJECT_ACTION_IDENTIFIERS, 'Select Project'),
    props<{ projectId: string }>()
)

const deselectProject = createAction(createActionType(PROJECT_ACTION_IDENTIFIERS, 'Deselect Project'))

const resetPagination = createAction(createActionType(PROJECT_ACTION_IDENTIFIERS, 'Reset Pagination'))

const createProject = createRemoteActionGroup<{ request: Model.CreateProjectRequest }, Model.ProjectResponse>(
    'Create Project',
    ...PROJECT_ACTION_IDENTIFIERS
)

const getProject = createRemoteActionGroup<{ projectId: string }, Model.ProjectResponse>(
    'Get Project',
    ...PROJECT_ACTION_IDENTIFIERS
)

const listProjects = createRemoteActionGroup<
    { pagination: Nullable<Partial<PaginatedQueryParams<Model.ProjectResponse>>> },
    PaginatedResponse<Model.ProjectResponse>
>('List Projects', ...PROJECT_ACTION_IDENTIFIERS)

const updateProject = createRemoteActionGroup<
    { projectId: string; update: Model.UpdateProjectRequest },
    Model.ProjectResponse
>('Update Project', ...PROJECT_ACTION_IDENTIFIERS)

const deleteProject = createRemoteActionGroup<{ projectId: string }, { projectId: string }>(
    'Delete Project',
    ...PROJECT_ACTION_IDENTIFIERS
)

export const ProjectLocalActions = {
    initialiseProjectState,
    updateProjectFilters,
    resetProjectFilters,
    resetProjectState,
    selectProject,
    deselectProject,
    resetPagination,
}

export const ProjectRemoteActions = createRemoteActionCRUDMap(PROJECT_ACTION_IDENTIFIERS, {
    create: createProject,
    get: getProject,
    list: listProjects,
    update: updateProject,
    delete: deleteProject,
})
