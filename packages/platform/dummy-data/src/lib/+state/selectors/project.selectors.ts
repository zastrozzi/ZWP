import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'

const selectProjectState = createFeatureSelector<Reducers.ProjectFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DUMMY_DATA_ACTION_IDENTIFIER,
        Identifiers.PROJECT_STATE_FEATURE_KEY
    )
)

const selectProjectFilters = createSelector(selectProjectState, (state) => state.filters)
const selectProjectRemotePagination = createSelector(selectProjectState, (state) => state.projectsRemotePagination)
const selectProjectRemoteState = createSelector(selectProjectState, selectRemoteState)

const selectSelectedProjectId = createSelector(selectProjectState, (state) => state.selectedProjectId)

const projectEntitySelectors = Reducers.projectEntityAdapter.getSelectors()
const selectProjectEntityState = createSelector(selectProjectState, (state) => state.projects)
const selectProjectIds = createSelector(selectProjectEntityState, projectEntitySelectors.selectIds)
const selectProjectEntities = createSelector(selectProjectEntityState, projectEntitySelectors.selectEntities)
const selectAllProjects = createSelector(selectProjectEntityState, projectEntitySelectors.selectAll)
const selectProjectTotal = createSelector(selectProjectEntityState, projectEntitySelectors.selectTotal)
const selectProjectById = (id: string) => createSelector(selectProjectEntities, (entities) => entities[id])

const selectedProject = createSelector(
    selectProjectEntities,
    selectSelectedProjectId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredProjects = createSelector(selectAllProjects, selectProjectFilters, (projects, filters) => selectFilteredElements(projects, filters, Model.projectFilterEntityMap))

const selectPaginatedProjects = createSelector(selectAllProjects, selectProjectRemotePagination, (projects, pagination) => selectPaginatedElements(projects, pagination))

const selectPaginatedFilteredProjects = createSelector(
    selectFilteredProjects,
    selectProjectRemotePagination,
    (projects, pagination) => selectPaginatedElements(projects, pagination)
)

export const ProjectSelectors = {
    selectProjectState,
    selectProjectFilters,
    selectProjectRemotePagination,
    selectProjectRemoteState,

    selectSelectedProjectId,

    projectEntitySelectors,
    selectProjectEntityState,
    selectProjectIds,
    selectProjectEntities,
    selectAllProjects,
    selectProjectTotal,
    selectProjectById,
    selectedProject,
    selectFilteredProjects,
    selectPaginatedProjects,
    selectPaginatedFilteredProjects
}