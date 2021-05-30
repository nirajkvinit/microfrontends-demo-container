import styled from 'styled-components';
import { HeadingSmall } from './HeadingSmall';

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 10px;
  height: 70vh;
`;

const IFrameContent = styled.iframe`
  background-color: #eee;
  position: relative;
  top: 2%;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const CenteredHeadingSmall = styled(HeadingSmall)`
  text-align: center;
  padding: 5px 0;
`;

export const IFrameContainer = ({ id, src, type, onLoad }) => {
  return (
    <Wrapper>
      <CenteredHeadingSmall>{type}</CenteredHeadingSmall>
      <IFrameContent id={id} src={src} onLoad={onLoad}></IFrameContent>
    </Wrapper>
  );
};
