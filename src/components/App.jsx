import React, { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions';
import { Section } from './Section';
import { Statistics } from './Statistics';

function App() {
  const [feedbackState, setFeedbackState] = useState({
    Good: 0,
    Neutral: 0,
    Bad: 0,
  });

  const countTotalFeedback = () => {
    const { Good, Neutral, Bad } = feedbackState;
    return Good + Neutral + Bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { Good } = feedbackState;
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((Good / total) * 100);
  };

  const handleLeaveFeedback = feedback => {
    setFeedbackState(prevState => ({
      ...prevState,
      [feedback]: prevState[feedback] + 1,
    }));
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const feedbackOptions = Object.keys(feedbackState);

  return (
    <div>
      <Section title="Leave Feedback">
        <FeedbackOptions
          options={feedbackOptions}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <p>There is no feedback</p>
        ) : (
          <Statistics
            good={feedbackState.Good}
            neutral={feedbackState.Neutral}
            bad={feedbackState.Bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
}

export default App;
