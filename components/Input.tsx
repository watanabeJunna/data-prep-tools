import { css, FlattenSimpleInterpolation } from 'styled-components'

export const InputStyle: FlattenSimpleInterpolation = css`
    display: block;
    font-size: 1.2em;
    border: none;
    border-radius: 0;
    outline: none;
    background: none;
    width: 200px;
    padding: 7px 0;
    margin: 24px 12px;
    border-bottom: 1px solid #dee7ec;
    transition: .5s;
    &:focus {
        border-bottom: 1px solid #228aff;
    }
`