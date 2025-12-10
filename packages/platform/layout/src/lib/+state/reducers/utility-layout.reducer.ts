import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { UtilityPanelEntity } from '../../model'
import { UtilityLayoutActions } from '../actions'