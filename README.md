```tsx
import React from 'react'
import style from 'styled-component'

const CellStyle = styled.div`
    width: 22%;
    padding: 22px;
    margin: auto 0;
`

interface CellInterface {
    key?: number
    text: string
}

const Cell: React.FC<CellInterface> = ({ key = 0, text }) => {
    const onDoubleClick = () => {
        if (elementState.selected) {
            setElementState({
                selected: false,
                element: <CellStyle
                            key={key}
                            onDoubleClick={onDoubleClick}
                        >
                            {text}
                        </CellStyle>
            })
        } else {
            setElementState({
                selected: true,
                element: <CellStyle
                            key={key}
                            onDoubleClick={onDoubleClick}>
                            Hello
                         </CellStyle>
            })
        }
    }

    type ElementState = {
        selected: boolean
        element: JSX.Element
    }

    const [elementState, setElementState] : [
        ElementState,
        Dispatch<SetStateAction<ElementState>>
    ] = useState<ElementState>({
        selected: false,
        element: <CellStyle
                    key={key}
                    onDoubleClick={onDoubleClick}
                >
                    {text}
                </CellStyle>
    })

    return elementState.element
}
```