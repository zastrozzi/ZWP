import { Nullable, PersistentState } from '@zwp/platform.common'
import { createReducer, on } from '@ngrx/store'
import { PanelDisplayMode, RightPanelEntity, RightPanelTypeEntity } from '../../model'
import { PanelLayoutActions } from '../actions'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'

export interface PanelLayoutFeatureState {
    leftPanelOpen: boolean
    leftPanelExpanded: boolean
    leftPanelCollapsedSize: number
    leftPanelExpandedSize: number
    leftPanelDisplayMode: PanelDisplayMode
    leftPanelDragHandleFocused: boolean

    rightPanelOpen: boolean
    rightPanelExpanded: boolean
    rightPanelCollapsedSize: number
    rightPanelExpandedSize: number
    rightPanelDisplayMode: PanelDisplayMode
    rightPanelDragHandleFocused: boolean

    bottomPanelOpen: boolean
    bottomPanelExpanded: boolean
    bottomPanelCollapsedSize: number
    bottomPanelExpandedSize: number
    bottomPanelDisplayMode: PanelDisplayMode
    bottomPanelDragHandleFocused: boolean

    detailPanelSize: number
    detailPanelDragHandleFocused: boolean

    rightPanels: EntityState<RightPanelEntity>
    selectedRightPanelId: Nullable<string>
}

export const persistentPanelLayout: PersistentState<PanelLayoutFeatureState> = {
    leftPanelOpen: true,
    leftPanelExpanded: true,
    leftPanelCollapsedSize: true,
    leftPanelExpandedSize: true,
    leftPanelDisplayMode: true,

    rightPanelOpen: true,
    rightPanelExpanded: true,
    rightPanelCollapsedSize: true,
    rightPanelExpandedSize: true,
    rightPanelDisplayMode: true,

    bottomPanelOpen: true,
    bottomPanelExpanded: true,
    bottomPanelCollapsedSize: true,
    bottomPanelExpandedSize: true,
    bottomPanelDisplayMode: true,

    detailPanelSize: true,
    rightPanels: true,
    selectedRightPanelId: true
}

const rightPanelEntitySelectId = (entity: RightPanelEntity) => entity.id
export const rightPanelEntityAdapter: EntityAdapter<RightPanelEntity> = createEntityAdapter<RightPanelEntity>({
    selectId: rightPanelEntitySelectId
})

export const initialPanelLayoutFeatureState: PanelLayoutFeatureState = {
    leftPanelOpen: true,
    leftPanelExpanded: false,
    leftPanelCollapsedSize: 60,
    leftPanelExpandedSize: 300,
    leftPanelDisplayMode: PanelDisplayMode.inline,
    leftPanelDragHandleFocused: false,

    rightPanelOpen: false,
    rightPanelExpanded: false,
    rightPanelCollapsedSize: 60,
    rightPanelExpandedSize: 500,
    rightPanelDisplayMode: PanelDisplayMode.inline,
    rightPanelDragHandleFocused: false,

    bottomPanelOpen: false,
    bottomPanelExpanded: false,
    bottomPanelCollapsedSize: 60,
    bottomPanelExpandedSize: 300,
    bottomPanelDisplayMode: PanelDisplayMode.inline,
    bottomPanelDragHandleFocused: false,

    detailPanelSize: 400,
    detailPanelDragHandleFocused: false,

    rightPanels: rightPanelEntityAdapter.getInitialState(),
    selectedRightPanelId: null
}

export const panelLayoutReducer = createReducer(
    initialPanelLayoutFeatureState,
    on(PanelLayoutActions.openLeftPanel, (state) => ({...state, leftPanelOpen: true})),
    on(PanelLayoutActions.closeLeftPanel, (state) => ({...state, leftPanelOpen: false})),
    on(PanelLayoutActions.expandLeftPanel, (state) => ({...state, leftPanelExpanded: true})),
    on(PanelLayoutActions.collapseLeftPanel, (state) => ({...state, leftPanelExpanded: false})),
    on(PanelLayoutActions.setLeftPanelDisplayMode, (state, { mode }) => ({...state, leftPanelDisplayMode: mode})),
    on(PanelLayoutActions.setLeftPanelExpandedSize, (state, { size }) => ({...state, leftPanelExpandedSize: size})),
    on(PanelLayoutActions.setLeftPanelCollapsedSize, (state, { size }) => ({...state, leftPanelCollapsedSize: size})),
    on(PanelLayoutActions.focusLeftPanelDragHandle, (state) => ({...state, leftPanelDragHandleFocused: true})),
    on(PanelLayoutActions.defocusLeftPanelDragHandle, (state) => ({...state, leftPanelDragHandleFocused: false})),

    on(PanelLayoutActions.openRightPanel, (state) => ({...state, rightPanelOpen: true})),
    on(PanelLayoutActions.closeRightPanel, (state) => ({...state, rightPanelOpen: false})),
    on(PanelLayoutActions.expandRightPanel, (state) => ({...state, rightPanelExpanded: true})),
    on(PanelLayoutActions.collapseRightPanel, (state) => ({...state, rightPanelExpanded: false})),
    on(PanelLayoutActions.setRightPanelDisplayMode, (state, { mode }) => ({...state, rightPanelDisplayMode: mode})),
    on(PanelLayoutActions.setRightPanelExpandedSize, (state, { size }) => ({...state, rightPanelExpandedSize: size})),
    on(PanelLayoutActions.setRightPanelCollapsedSize, (state, { size }) => ({...state, rightPanelCollapsedSize: size})),
    on(PanelLayoutActions.focusRightPanelDragHandle, (state) => ({...state, rightPanelDragHandleFocused: true})),
    on(PanelLayoutActions.defocusRightPanelDragHandle, (state) => ({...state, rightPanelDragHandleFocused: false})),

    on(PanelLayoutActions.openBottomPanel, (state) => ({...state, bottomPanelOpen: true})),
    on(PanelLayoutActions.closeBottomPanel, (state) => ({...state, bottomPanelOpen: false})),
    on(PanelLayoutActions.expandBottomPanel, (state) => ({...state, bottomPanelExpanded: true})),
    on(PanelLayoutActions.collapseBottomPanel, (state) => ({...state, bottomPanelExpanded: false})),
    on(PanelLayoutActions.setBottomPanelDisplayMode, (state, { mode }) => ({...state, bottomPanelDisplayMode: mode})),
    on(PanelLayoutActions.setBottomPanelExpandedSize, (state, { size }) => ({...state, bottomPanelExpandedSize: size})),
    on(PanelLayoutActions.setBottomPanelCollapsedSize, (state, { size }) => ({...state, bottomPanelCollapsedSize: size})),
    on(PanelLayoutActions.focusBottomPanelDragHandle, (state) => ({...state, bottomPanelDragHandleFocused: true})),
    on(PanelLayoutActions.defocusBottomPanelDragHandle, (state) => ({...state, bottomPanelDragHandleFocused: false})),

    on(PanelLayoutActions.setDetailPanelSize, (state, { size }) => ({...state, detailPanelSize: size})),
    on(PanelLayoutActions.focusDetailPanelDragHandle, (state) => ({...state, detailPanelDragHandleFocused: true})),
    on(PanelLayoutActions.defocusDetailPanelDragHandle, (state) => ({...state, detailPanelDragHandleFocused: false})),

    on(PanelLayoutActions.createRightPanelSuccess, (state, { rightPanelEntity }) => ({
        ...state, 
        rightPanels: rightPanelEntityAdapter.setOne(rightPanelEntity, state.rightPanels)
    })),

    on(PanelLayoutActions.removeRightPanelSuccess, (state, { id }) => ({
        ...state,
        rightPanels: rightPanelEntityAdapter.removeOne(id, state.rightPanels)
    })),

    on(PanelLayoutActions.removeAllRightPanels, (state) => ({
        ...state,
        rightPanels: rightPanelEntityAdapter.removeAll(state.rightPanels)
    })),

    on(PanelLayoutActions.removeRightPanelsForCategory, (state, { category }) => {
        const ids: string[] = state.rightPanels.ids.map(id => `${id}`).filter(id => {
            const panel = state.rightPanels.entities[id]
            if (!panel) return false
            return panel.category === category
        })
        return {...state, rightPanels: rightPanelEntityAdapter.removeMany(ids, state.rightPanels)}
    }),

    on(PanelLayoutActions.selectRightPanel, (state, { id }) => ({...state, selectedRightPanelId: id})),
    on(PanelLayoutActions.deselectRightPanel, (state) => ({...state, selectedRightPanelId: null}))
)