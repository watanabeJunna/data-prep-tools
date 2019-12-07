import styled from 'styled-components'
import { ExportDataComponent, LoadDataComponent, AddDimensionComponent } from '../'

export default () => {
    const OperationContent = styled.div`
        display: flex;
    `

    return (
        <OperationContent>
            <LoadDataComponent />
            <AddDimensionComponent />
            <ExportDataComponent />
        </OperationContent>
    )
}