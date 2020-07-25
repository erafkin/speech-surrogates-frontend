/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';


const TypologicalQuestions = () => {
  return (
    <div style={{ margin: '2vw' }}>
      <h1>Typological questions about surrogate languages</h1>
      <p style={{ fontStyle: 'italic' }}>Definition</p>
      <ul>
        <li>What defines the boundaries of surrogate language?</li>
      </ul>
      <p style={{ fontStyle: 'italic' }}>Encoding</p>
      <ul>
        <li>How does a modality’s physical qualities affect encoding?</li>
        <ul>
          <li>between linguistic systems (e.g. same instrument, different language)?</li>
          <li>within linguistic systems with multiple modalities (e.g. same language, different instruments)?</li>
        </ul>
        <li>How prevalent is the encoding of underlying tone versus surface tone?</li>
        <li>How are contour tones encoded on instruments with continuous versus discrete pitch?</li>
        <li>Is surface tone encoding more common</li>
        <ul>
          <li>in two-tone systems?</li>
          <li>in systems with drastic post-lexical tone processes?</li>
        </ul>
        <li>Do lexical vs. postlexical encoding effects arise for segmental encoding? </li>
        <li>Do systems based on tone languages</li>
        <ul>
          <li>universally encode tone?</li>
          <li>ever (also) encode vowel height?</li>
        </ul>
        <li>Do systems ever encode only at the word level?</li>
        <li>How much phonetic detail finds its way into surrogate encoding?</li>
        <li>How do systems encode languages other than the local language?</li>
      </ul>
      <p style={{ fontStyle: 'italic' }}>Content</p>
      <ul>
        <li>Are whistling systems typically less formal in content than musical systems?</li>
        <li>How large are surrogate system lexicons?</li>
        <li>Are surrogate systems more common in acoustically challenging environments?</li>
        <li>What kinds of messages are encoded? (e.g. courtship, asking for money, making announcements, etc.)</li>
      </ul>
      <p style={{ fontStyle: 'italic' }}>Specialization</p>
      <ul>
        <li>Are whistling systems typically less restrictive on practitioners?</li>
        <li> How often is surrogate language male-exclusive?</li>
        <li>How widely understood is the surrogate system by non-practitioners? </li>
      </ul>
      <p style={{ fontStyle: 'italic' }}>Productivity</p>
      <ul>
        <li>How much does productivity vary between practitioners with a system?</li>
        <li>Is enphrasing</li>
        <ul>
          <li>universal?</li>
          <li>more prevalent in systems used for long-distance communication?</li>
          <li>more prevalent with simpler phonological systems (i.e. fewer tones leading to greater ambiguity)?</li>
        </ul>
        <li>Are novel surrogate utterances </li>
        <ul>
          <li>common in practice?</li>
          <li>more common in systems with larger communities of practice?</li>
        </ul>
      </ul>
    </div>
  );
};

export default TypologicalQuestions;
