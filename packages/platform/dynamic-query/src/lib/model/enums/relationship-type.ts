import { TransformEnumPipeSignature } from '@zwp/platform.common'

export enum RelationshipType {
    oneToOne = 'oneToOne',
    oneToMany = 'oneToMany',
    manyToOne = 'manyToOne',
    manyToMany = 'manyToMany'
}

export enum RelationshipTypeLabel {
    oneToOne = 'Unique Association',
    oneToMany = 'Children',
    manyToOne = 'Parent',
    manyToMany = 'Siblings'
}

export const relationshipLabelPipeSignature: TransformEnumPipeSignature = { input: RelationshipType, output: RelationshipTypeLabel }