import styled from 'styled-components'
import Header from './Header'
import Pagination from './Pagination'
import FeatureContent from './FeatureContent'

export const DataPrep: React.FC = () => {
    const Wrapper = styled.div`
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        box-shadow: 0px 1px 4px rgb(176, 176, 176);
        padding: 25px 0;
    `

    return (
        <Wrapper>
            <Header />
            <FeatureContent />
            <Pagination />
        </Wrapper>
    )
}