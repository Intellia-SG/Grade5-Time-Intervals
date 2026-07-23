import React from 'react';
import { FindEndTimeQ } from './FindEndTimeQ.jsx';
import { FindDurationQ } from './FindDurationQ.jsx';
import { FindStartTimeQ } from './FindStartTimeQ.jsx';
import { Convert12to24Q, Convert24to12Q } from './Convert12to24Q.jsx';
import { JourneyWordProbQ, ScheduleWordProbQ } from './JourneyWordProbQ.jsx';
import { TrueFalseDurationQ, TimetableMCQ, UnitConversionQ } from './TrueFalseDurationQ.jsx';

export function QuestionRenderer({ question, onSelectAnswer, selectedOption, disabled = false, format = '12h' }) {
  if (!question) return null;

  switch (question.type) {
    case 'find_end_time':
      return <FindEndTimeQ question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} format={format} />;
    case 'find_duration':
      return <FindDurationQ question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} format={format} />;
    case 'find_start_time':
      return <FindStartTimeQ question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} format={format} />;
    case 'convert_12_to_24':
      return <Convert12to24Q question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} />;
    case 'convert_24_to_12':
      return <Convert24to12Q question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} />;
    case 'journey_word_problem':
      return <JourneyWordProbQ question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} format={format} />;
    case 'schedule_word_problem':
      return <ScheduleWordProbQ question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} />;
    case 'true_false_duration':
      return <TrueFalseDurationQ question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} />;
    case 'timetable_mcq':
      return <TimetableMCQ question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} />;
    case 'unit_conversion':
      return <UnitConversionQ question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} />;
    default:
      return <FindEndTimeQ question={question} onSelectAnswer={onSelectAnswer} selectedOption={selectedOption} disabled={disabled} format={format} />;
  }
}
