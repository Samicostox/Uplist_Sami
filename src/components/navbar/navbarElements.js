import {NavLink as Link} from 'react-router-dom';
import styled from 'styled-components';

// this is a styled link such that we can highlight the active tab
export const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    &.active {
        color: rgb(20, 240, 104);;
    }
    &.visited{
        color: white;
    }
`;