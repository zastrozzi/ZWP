import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PanelDisplayMode, RightPanelEntity, RightPanelTypeEntity } from '../../model'
import { Identifiers } from '../identifiers'
import { PanelLayoutFeatureState, rightPanelEntityAdapter } from '../reducers'
import { ComponentPortal } from '@angular/cdk/portal'
import { getZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '../../decorators'
import { Injector } from '@angular/core'
import { createNamespacedFeatureKey } from '@zwp/platform.common'

const panelLayoutState = createFeatureSelector<PanelLayoutFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER,
        Identifiers.PANEL_LAYOUT_STATE_FEATURE_KEY
    )
)

const selectLeftPanelOpen = createSelector(panelLayoutState, (state) => state.leftPanelOpen)
const selectLeftPanelExpanded = createSelector(panelLayoutState, (state) => state.leftPanelExpanded)
const selectLeftPanelCollapsedSize = createSelector(panelLayoutState, (state) => state.leftPanelCollapsedSize)
const selectLeftPanelExpandedSize = createSelector(panelLayoutState, (state) => state.leftPanelExpandedSize)
const selectLeftPanelDisplayMode = createSelector(panelLayoutState, (state) => state.leftPanelDisplayMode)
const selectLeftPanelSize = createSelector(
    selectLeftPanelExpanded,
    selectLeftPanelExpandedSize,
    selectLeftPanelCollapsedSize,
    (isExpanded, expandedSize, collapsedSize) => (isExpanded ? expandedSize : collapsedSize)
)
const selectLeftPanelHasShadow = createSelector(
    selectLeftPanelDisplayMode,
    selectLeftPanelOpen,
    selectLeftPanelExpanded,
    (displayMode, isOpen, isExpanded) =>
        displayMode === PanelDisplayMode.over
            ? true
            : displayMode === PanelDisplayMode.inlineAndOver
            ? isOpen && isExpanded
                ? true
                : false
            : false
)

const selectLeftPanelHasMouseEnter = createSelector(
    selectLeftPanelDisplayMode,
    selectLeftPanelOpen,
    selectLeftPanelExpanded,
    (displayMode, isOpen, isExpanded) =>
        displayMode === PanelDisplayMode.inlineAndOver && isOpen && !isExpanded ? true : false
)

const selectLeftPanelHasMouseOut = createSelector(
    selectLeftPanelDisplayMode,
    selectLeftPanelOpen,
    selectLeftPanelExpanded,
    (displayMode, isOpen, isExpanded) =>
        displayMode === PanelDisplayMode.inlineAndOver && isOpen && isExpanded ? true : false
)

const selectLeftPanelMouseEvents = createSelector(
    selectLeftPanelHasMouseEnter,
    selectLeftPanelHasMouseOut,
    (mouseEnter, mouseOut) => ({ mouseEnter: mouseEnter, mouseOut: mouseOut })
)

const selectLeftPanelDragHandleFocused = createSelector(panelLayoutState, (state) => state.leftPanelDragHandleFocused)
const selectLeftPanelDragHandleExpanded = createSelector(
    selectLeftPanelDragHandleFocused,
    selectLeftPanelOpen,
    selectLeftPanelExpanded,
    (isFocused, isOpen, isExpanded) => isFocused && isOpen && isExpanded
)

const selectRightPanelOpen = createSelector(panelLayoutState, (state) => state.rightPanelOpen)
const selectRightPanelExpanded = createSelector(panelLayoutState, (state) => state.rightPanelExpanded)
const selectRightPanelCollapsedSize = createSelector(panelLayoutState, (state) => state.rightPanelCollapsedSize)
const selectRightPanelExpandedSize = createSelector(panelLayoutState, (state) => state.rightPanelExpandedSize)
const selectRightPanelDisplayMode = createSelector(panelLayoutState, (state) => state.rightPanelDisplayMode)
const selectRightPanelSize = createSelector(
    selectRightPanelExpanded,
    selectRightPanelExpandedSize,
    selectRightPanelCollapsedSize,
    (isExpanded, expandedSize, collapsedSize) => (isExpanded ? expandedSize : collapsedSize)
)
const selectRightPanelHasShadow = createSelector(
    selectRightPanelDisplayMode,
    selectRightPanelOpen,
    selectRightPanelExpanded,
    (displayMode, isOpen, isExpanded) =>
        displayMode === PanelDisplayMode.over
            ? true
            : displayMode === PanelDisplayMode.inlineAndOver
            ? isOpen && isExpanded
                ? true
                : false
            : false
)

const selectRightPanelHasMouseEnter = createSelector(
    selectRightPanelDisplayMode,
    selectRightPanelOpen,
    selectRightPanelExpanded,
    (displayMode, isOpen, isExpanded) =>
        displayMode === PanelDisplayMode.inlineAndOver && isOpen && !isExpanded ? true : false
)

const selectRightPanelHasMouseOut = createSelector(
    selectRightPanelDisplayMode,
    selectRightPanelOpen,
    selectRightPanelExpanded,
    (displayMode, isOpen, isExpanded) =>
        displayMode === PanelDisplayMode.inlineAndOver && isOpen && isExpanded ? true : false
)

const selectRightPanelMouseEvents = createSelector(
    selectRightPanelHasMouseEnter,
    selectRightPanelHasMouseOut,
    (mouseEnter, mouseOut) => ({ mouseEnter: mouseEnter, mouseOut: mouseOut })
)

const selectRightPanelDragHandleFocused = createSelector(panelLayoutState, (state) => state.rightPanelDragHandleFocused)
const selectRightPanelDragHandleExpanded = createSelector(
    selectRightPanelDragHandleFocused,
    selectRightPanelOpen,
    selectRightPanelExpanded,
    (isFocused, isOpen, isExpanded) => isFocused && isOpen && isExpanded
)

const selectBottomPanelOpen = createSelector(panelLayoutState, (state) => state.bottomPanelOpen)
const selectBottomPanelExpanded = createSelector(panelLayoutState, (state) => state.bottomPanelExpanded)
const selectBottomPanelCollapsedSize = createSelector(panelLayoutState, (state) => state.bottomPanelCollapsedSize)
const selectBottomPanelExpandedSize = createSelector(panelLayoutState, (state) => state.bottomPanelExpandedSize)
const selectBottomPanelDisplayMode = createSelector(panelLayoutState, (state) => state.bottomPanelDisplayMode)
const selectBottomPanelSize = createSelector(
    selectBottomPanelExpanded,
    selectBottomPanelExpandedSize,
    selectBottomPanelCollapsedSize,
    (isExpanded, expandedSize, collapsedSize) => (isExpanded ? expandedSize : collapsedSize)
)
const selectBottomPanelDragHandleFocused = createSelector(
    panelLayoutState,
    (state) => state.bottomPanelDragHandleFocused
)
const selectBottomPanelDragHandleExpanded = createSelector(
    selectBottomPanelDragHandleFocused,
    selectBottomPanelOpen,
    selectBottomPanelExpanded,
    (isFocused, isOpen, isExpanded) => isFocused && isOpen && isExpanded
)

const selectDetailPanelSize = createSelector(panelLayoutState, (state) => state.detailPanelSize)
const selectDetailPanelDragHandleFocused = createSelector(
    panelLayoutState,
    (state) => state.detailPanelDragHandleFocused
)

const selectMainPanelMarginLeft = createSelector(
    selectLeftPanelDisplayMode,
    selectLeftPanelOpen,
    selectLeftPanelCollapsedSize,
    selectLeftPanelSize,
    (displayMode, isOpen, collapsedSize, size) =>
        displayMode === PanelDisplayMode.inlineAndOver
            ? isOpen
                ? collapsedSize
                : 0
            : displayMode === PanelDisplayMode.inline
            ? isOpen
                ? size
                : 0
            : 0
)

const selectMainPanelMarginRight = createSelector(
    selectRightPanelDisplayMode,
    selectRightPanelOpen,
    selectRightPanelCollapsedSize,
    selectRightPanelSize,
    (displayMode, isOpen, collapsedSize, size) =>
        displayMode === PanelDisplayMode.inlineAndOver
            ? isOpen
                ? collapsedSize
                : 0
            : displayMode === PanelDisplayMode.inline
            ? isOpen
                ? size
                : 0
            : 0
)

const selectMainPanelMarginBottom = createSelector(
    selectBottomPanelDisplayMode,
    selectBottomPanelOpen,
    selectBottomPanelCollapsedSize,
    selectBottomPanelSize,
    (displayMode, isOpen, collapsedSize, size) =>
        displayMode === PanelDisplayMode.inlineAndOver
            ? isOpen
                ? collapsedSize
                : 0
            : displayMode === PanelDisplayMode.inline
            ? isOpen
                ? size
                : 0
            : 0
)

const selectPanelClickDismissLeftPanel = createSelector(
    selectLeftPanelDisplayMode,
    selectLeftPanelOpen,
    selectLeftPanelExpanded,
    (displayMode, isOpen, isExpanded) =>
        displayMode === PanelDisplayMode.inlineAndOver && isOpen && isExpanded ? true : false
)

const selectPanelClickDismissRightPanel = createSelector(
    selectRightPanelDisplayMode,
    selectRightPanelOpen,
    selectRightPanelExpanded,
    (displayMode, isOpen, isExpanded) =>
        displayMode === PanelDisplayMode.inlineAndOver && isOpen && isExpanded ? true : false
)

const selectPanelClickDismissBottomPanel = createSelector(
    selectBottomPanelDisplayMode,
    selectBottomPanelOpen,
    selectBottomPanelExpanded,
    (displayMode, isOpen, isExpanded) =>
        displayMode === PanelDisplayMode.inlineAndOver && isOpen && isExpanded ? true : false
)

const selectMainPanelClickDismissals = createSelector(
    selectPanelClickDismissLeftPanel,
    selectPanelClickDismissRightPanel,
    selectPanelClickDismissBottomPanel,
    (leftPanel, rightPanel, bottomPanel) => ({ left: leftPanel, right: rightPanel, bottom: bottomPanel })
)

const selectLeftPanelClickDismissals = createSelector(selectPanelClickDismissLeftPanel, (leftPanel) => ({
    left: leftPanel,
}))

const rightPanelEntitySelectors = rightPanelEntityAdapter.getSelectors()
const extractBaseIds = (ids: string[]) => ids.map((id) => id?.split('#', 1)[0] ?? '')

const rightPanelUntypedIds = createSelector(panelLayoutState, (state) =>
    rightPanelEntitySelectors.selectIds(state.rightPanels)
)
const rightPanelIds = createSelector(rightPanelUntypedIds, (ids) => ids as string[])
const rightPanelBaseIds = createSelector(rightPanelIds, (ids) => extractBaseIds(ids))
const rightPanelEntities = createSelector(panelLayoutState, (state) =>
    rightPanelEntitySelectors.selectEntities(state.rightPanels)
)
const allRightPanels = createSelector(panelLayoutState, (state) =>
    rightPanelEntitySelectors.selectAll(state.rightPanels)
)
const totalRightPanels = createSelector(panelLayoutState, (state) =>
    rightPanelEntitySelectors.selectTotal(state.rightPanels)
)
const getRightPanelById = (id: string) => createSelector(rightPanelEntities, (entities) => entities[id])
const selectedRightPanelId = createSelector(panelLayoutState, (state) => state.selectedRightPanelId)
const selectedRightPanel = createSelector(
    rightPanelEntities,
    selectedRightPanelId,
    (entities, id) => entities[id ?? '']
)

const selectedRightPanelPortal = createSelector(selectedRightPanel, (rightPanel) => {
    if (rightPanel) {
        return new ComponentPortal(
            getZWPRightPanelComponent(rightPanel.componentName),
            null,
            Injector.create({
                providers: [{ provide: RIGHT_PANEL_COMPONENT_DATA, useValue: rightPanel.data }],
            })
        )
    }
    return null
})

const rightPanelCategories = createSelector(allRightPanels, (rightPanels) => {
    const categories = new Set<RightPanelTypeEntity>()
    rightPanels.forEach((rightPanel) =>
        categories.add({
            category: rightPanel.category,
            icon: rightPanel.icon,
        })
    )
    return Array.from(categories)
})

const rightPanelsByCategory = createSelector(rightPanelCategories, allRightPanels, (categories, rightPanels) => {
    const panelsByCategory = new Map<RightPanelTypeEntity, RightPanelEntity[]>()
    categories.forEach((category) => {
        panelsByCategory.set(
            category,
            rightPanels.filter((panel) => panel.category === category.category)
        )
    })
    return panelsByCategory
})

const rightPanelIdsByDataId = (id: string) =>
    createSelector(allRightPanels, (rightPanels) =>
        rightPanels.filter((panel) => panel.dataId === id).map((panel) => panel.id)
    )

const hasRightPanelsForDataId = (id: string) => createSelector(
    rightPanelIdsByDataId(id),
    ids => ids.length > 0
)

export const LeftPanelSelectors = {
    selectLeftPanelOpen,
    selectLeftPanelExpanded,
    selectLeftPanelCollapsedSize,
    selectLeftPanelExpandedSize,
    selectLeftPanelDisplayMode,
    selectLeftPanelSize,
    selectLeftPanelHasShadow,
    selectLeftPanelHasMouseEnter,
    selectLeftPanelHasMouseOut,
    selectLeftPanelMouseEvents,
    selectLeftPanelDragHandleFocused,
    selectLeftPanelDragHandleExpanded,
    selectLeftPanelClickDismissals,
}

export const RightPanelSelectors = {
    selectRightPanelOpen,
    selectRightPanelExpanded,
    selectRightPanelCollapsedSize,
    selectRightPanelExpandedSize,
    selectRightPanelDisplayMode,
    selectRightPanelSize,
    selectRightPanelHasShadow,
    selectRightPanelHasMouseEnter,
    selectRightPanelHasMouseOut,
    selectRightPanelMouseEvents,
    selectRightPanelDragHandleFocused,
    selectRightPanelDragHandleExpanded,
    rightPanelIds,
    rightPanelBaseIds,
    rightPanelEntities,
    allRightPanels,
    totalRightPanels,
    getRightPanelById,
    selectedRightPanelId,
    selectedRightPanel,
    selectedRightPanelPortal,
    rightPanelCategories,
    rightPanelsByCategory,
    rightPanelIdsByDataId,
    hasRightPanelsForDataId
}

export const BottomPanelSelectors = {
    selectBottomPanelOpen,
    selectBottomPanelExpanded,
    selectBottomPanelCollapsedSize,
    selectBottomPanelExpandedSize,
    selectBottomPanelDisplayMode,
    selectBottomPanelSize,
    selectBottomPanelDragHandleFocused,
    selectBottomPanelDragHandleExpanded,
}

export const DetailPanelSelectors = {
    selectDetailPanelSize,
    selectDetailPanelDragHandleFocused,
}

export const MainPanelSelectors = {
    selectMainPanelMarginLeft,
    selectMainPanelMarginRight,
    selectMainPanelMarginBottom,
    selectMainPanelClickDismissals,
}
