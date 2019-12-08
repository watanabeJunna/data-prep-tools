import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { InputStyle } from '../../Input'
import { RootState } from '../../../store/reducer'
import { FeatureValue } from '../../../interfaces'
import { updateScalar } from '../../../store/features/actions'
import { Columns } from '../../../store/columns/actions'

export default () => {
    const [columns, currentChunkNumber, features] =
        useSelector((state: RootState) => {
            return [
                state.columns.columns,
                state.currentChunkNumber.currentChunkNumber,
                state.features.features,
            ]
        })
    const scrollTopRef = useRef<number>(0)
    const dataContentRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useDispatch()

    const DataContent: React.FC = ({ children }) => {
        const Style = styled.div`
            max-height: 620px;
            color: #777777;
            font-family: "Yu Gothic";
            overflow: auto;
            border-bottom: 1px solid rgba(176, 176, 176, 0.5);
        `

        useEffect((): void => {
            if (!dataContentRef.current) {
                return
            }
            dataContentRef.current.scrollTop = scrollTopRef.current
        }, [dataContentRef])

        return (
            <Style
                ref={dataContentRef}
                onScroll={() => {
                    if (!dataContentRef.current) {
                        throw new Error('No reference to Data content')
                    }

                    scrollTopRef.current = dataContentRef.current.scrollTop
                }}
            >
                {children}
            </Style>
        )
    }

    const Column = styled.div`
        display: flex;
        font-weight: 900;
        color: #777777;
        font-family: "Yu Gothic";
        padding: 12px 24px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
    `

    const ColumnCell = styled.div`
        width: 22%;
        overflow: hidden;
        padding: 22px;
        margin: auto 0;
    `

    const Row = styled.div`
        display: flex;
        padding: 0 24px;
        border-bottom: 1px solid rgba(176, 176, 176, 0.5);
        &:hover {
            background-color: rgb(244, 246, 249);
        }
    `

    const IDCell = styled.div`
        width: 10%;
        padding: 22px;
        margin: auto 0;
    `

    interface IRowCell {
        text: string
        dataNumber: number
        rowNumber: number
        columnNumber: number
    }

    const RowCell: React.FC<IRowCell> = ({ dataNumber, columnNumber, rowNumber, text }) => {
        const [selected, setSelected] = useState<boolean>(false)
        const inputRef = useRef<HTMLInputElement | null>(null)
        const inputValueRef = useRef<string>('')

        /**
         * Perform element toggle and scalar update.
         */
        const handleSelectEvent = (): void => {
            setSelected(!selected)

            if (inputValueRef.current && inputValueRef.current !== text) {
                dispatch(updateScalar(dataNumber, columnNumber, rowNumber, inputValueRef.current))
            }
        }

        /**
         * If a specific key is pressed, call handleSelectEvent.
         * 
         * @param e The KeyboardEvent.
         */
        const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
            if (!inputRef.current) {
                throw new Error('No reference to data input')
            }

            if (e.key === 'Enter') {
                handleSelectEvent()
            }
        }

        const CellStyle = styled.div`
            width: 22%;
            height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding: 22px;
            margin: auto 0;
            transition: .3s;
            &:hover {
                color: #03b1b6fa;
                background-color: #03b1b611;
            }
        `

        const InputCell = styled.div`
            width: 22%;
            padding: 11px 22px;
            margin: auto 0;
        `

        const DataInput = styled.input`
            ${InputStyle}
            width: 100%;
            color: #777777;
            font-size: 1.0em;
            font-family: "Yu Gothic";
            font-weight: 400;
            padding: 0px;
            margin: 0px;
            border-bottom: 2px solid #dee7ec;
            &:focus {
                border-bottom: 2px solid #228aff;
            }
        `

        return selected ? (
            <InputCell>
                <DataInput
                    ref={inputRef}
                    autoFocus={true}
                    defaultValue={inputValueRef.current ? inputValueRef.current : text}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleInputKeyPress(e)}
                    onClick={() => handleSelectEvent()}
                    onBlur={() => handleSelectEvent()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputValueRef.current = e.target.value}
                />
            </InputCell>
        ) : (
                <CellStyle
                    onClick={() => handleSelectEvent()}
                >
                    {inputValueRef.current ? inputValueRef.current : text}
                </CellStyle>
            )
    }

    const makeColumns = (columns: Columns): JSX.Element[] => {
        const columnElements = columns.map((column, c) => {
            return (
                <ColumnCell key={c}>
                    {column}
                </ColumnCell>
            )
        })
        return columnElements
    }

    const makeRows = (features: FeatureValue | undefined): JSX.Element[] => {
        if (!features) {
            throw new Error('Features does not exist')
        }

        const rowElements = features.map((feature, rownumber) => {
            return (
                <Row key={rownumber}>
                    <IDCell key={rownumber}>
                        {rownumber + 1}
                    </IDCell>
                    {feature.map((scalar, columnnumber) => 
                        <RowCell
                            key={columnnumber}
                            text={scalar}
                            dataNumber={currentChunkNumber}
                            columnNumber={columnnumber}
                            rowNumber={rownumber}
                        />
                    )}
                </Row>
            )
        })
        return rowElements
    } 

    return (
        <>
            {features.size !== 0 && (
                <>
                    <Column>
                        <IDCell key={columns.length}>
                            ID
                        </IDCell>
                        {makeColumns(columns)}
                    </Column>
                    <DataContent>
                        {makeRows(features.get(currentChunkNumber))}
                    </DataContent>
                </>
            )}
        </>
    )
}