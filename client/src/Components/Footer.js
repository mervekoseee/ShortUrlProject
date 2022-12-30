import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
position: fixed;
display: flex;
bottom: 0;
left: 0;
width: 100%;
justify-content: center;
height: 3%;
background-color: #dfe7fd;
color: gray;

`;

export const Footer = () => {
    return (
        <StyledFooter>
            Ücretsiz Link Kısaltıcı Servis Uygulaması
        </StyledFooter>
        
    ) 
}
export default Footer;