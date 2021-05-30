import React, { useState } from 'react';
import isUrl from 'validator/lib/isURL';
import Spinner from 'react-spinkit';
import {
  Button,
  Divider,
  Heading,
  ErrorMessage,
  TextInput,
  HeadingSmall,
  FullWidthContentSection,
  IFrameContainer,
  LessonPresentationHeader,
  LessonPresentationContainer,
} from '../ui';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [lessonPresentationUrl, setLessonPresentationUrl] = useState('');
  const [errorMessageVal, setErrorMessageVal] = useState(null);
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);

  const onClickLoadPresentation = () => {
    const validatorOption = inputValue.includes('localhost')
      ? { require_tld: false }
      : {};
    if (!isUrl(inputValue, validatorOption)) {
      setErrorMessageVal('Please input correct lesson presentation URL');
      return;
    }
    setTeacherLoading(true);
    setStudentLoading(true);

    setLessonPresentationUrl(inputValue);
    setErrorMessageVal(null);
  };

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
          <IFrameContainer
            id="teacheriframe"
            src={lessonPresentationUrl}
            type="Teacher"
            onLoad={() => setTeacherLoading(false)}
          ></IFrameContainer>
          <IFrameContainer
            id="studentiframe"
            src={lessonPresentationUrl}
            type="Student"
            onLoad={() => setStudentLoading(false)}
          ></IFrameContainer>
        </LessonPresentationContainer>
      ) : (
        <LessonPresentationContainer>
          <HeadingSmall>Please input lesson presentation URL</HeadingSmall>
        </LessonPresentationContainer>
      )}
    </FullWidthContentSection>
  );
};
