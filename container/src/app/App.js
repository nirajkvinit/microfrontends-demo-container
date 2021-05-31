import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import isUrl from 'validator/lib/isURL';

import {
  Button,
  Divider,
  Heading,
  ErrorMessage,
  TextInput,
  HeadingSmall,
  FullWidthContentSection,
  LessonPresentationHeader,
  LessonPresentationContainer,
  IFrameWrapper,
  IFrameContent,
} from '../ui';

const CenteredHeadingSmall = styled(HeadingSmall)`
  text-align: center;
  padding: 5px 0;
`;

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [lessonPresentationUrl, setLessonPresentationUrl] = useState('');
  const [errorMessageVal, setErrorMessageVal] = useState(null);

  const [teacherIframeLoaded, setTeacherIframeLoaded] = useState(false);
  const [studentIframeLoaded, setStudentIframeLoaded] = useState(false);

  let IframeRefTeacher = useRef(null);
  let IframeRefStudent = useRef(null);

  const sendMessage = (type, message) => {
    if (type === 'teacher') {
      IframeRefTeacher.current.contentWindow.postMessage(message, '*');
    } else {
      IframeRefTeacher.current.contentWindow.postMessage(message, '*');
    }
  };

  const onClickLoadPresentation = () => {
    const validatorOption = inputValue.includes('localhost')
      ? { require_tld: false }
      : {};

    if (!isUrl(inputValue, validatorOption)) {
      setLessonPresentationUrl('');
      setErrorMessageVal('Please input correct lesson presentation URL');
      return;
    }

    setLessonPresentationUrl(inputValue);
    setErrorMessageVal(null);
  };

  useEffect(() => {
    if (teacherIframeLoaded) {
      sendMessage('teacher', Math.random());
      setTeacherIframeLoaded(false);
    }
  }, [teacherIframeLoaded]);

  useEffect(() => {
    if (studentIframeLoaded) {
      sendMessage('student', Math.random());
      setStudentIframeLoaded(false);
    }
  }, [studentIframeLoaded]);

  return (
    <FullWidthContentSection>
      <Heading>Micro-Frontends Demo</Heading>
      <LessonPresentationHeader>
        <TextInput
          placeholder="Lesson Presentation URL"
          style={{ flex: 5, marginRight: '8px' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={onClickLoadPresentation} style={{ flex: 2 }}>
          Load Presentation
        </Button>
      </LessonPresentationHeader>

      {errorMessageVal ? <ErrorMessage>{errorMessageVal}</ErrorMessage> : null}
      <Divider />

      {lessonPresentationUrl ? (
        <LessonPresentationContainer>
          <IFrameWrapper>
            <CenteredHeadingSmall>Teacher</CenteredHeadingSmall>
            <IFrameContent
              src={lessonPresentationUrl}
              ref={IframeRefTeacher}
              onLoad={() => setTeacherIframeLoaded(true)}
            ></IFrameContent>
          </IFrameWrapper>
          <IFrameWrapper>
            <CenteredHeadingSmall>Student</CenteredHeadingSmall>
            <IFrameContent
              src={lessonPresentationUrl}
              ref={IframeRefStudent}
              onLoad={() => setStudentIframeLoaded(true)}
            ></IFrameContent>
          </IFrameWrapper>
        </LessonPresentationContainer>
      ) : (
        <LessonPresentationContainer>
          <HeadingSmall>Please input lesson presentation URL</HeadingSmall>
        </LessonPresentationContainer>
      )}
    </FullWidthContentSection>
  );
};
