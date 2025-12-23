import { browser } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import voiceRecorder from '../pageobjects/VoiceRecorderPage.js';

describe('Easy Voice Recorder Tests', () => {
  beforeEach(async () => {
    await browser.startActivity(
      'com.coffeebeanventures.easyvoicerecorder',
      'com.digipom.easyvoicerecorder.ui.activity.EasyVoiceRecorderActivity'
    );
  });

  it('Verify default state on launch', async () => {
    allureReporter.startStep('Check default state on launch');
    await voiceRecorder.assertRecordTabIsDisplayed();
    await voiceRecorder.assertRecordTabIsSelected();
    await voiceRecorder.assertRecordPauseButtonIsDisplayed();
    await voiceRecorder.assertRecordPauseBtnIsClickable();
    allureReporter.endStep();
  });

  it('Verify user can start recording', async () => {
    allureReporter.startStep('Start recording and check status');
    await voiceRecorder.startRecording();
    await voiceRecorder.assertRecordPauseBtnIsInRecordingMode();
    await voiceRecorder.assertRecordingTimeIsIncreasing();
    allureReporter.endStep();
  });

  it('Verify user can pause recording', async () => {
    allureReporter.startStep('Pause recording and check status');
    await voiceRecorder.startRecording();
    await voiceRecorder.pauseRecording();
    await voiceRecorder.assertRecordPauseBtnIsInPauseMode();
    await voiceRecorder.assertRecordingIsPaused();
    await voiceRecorder.assertRecordingTimeIsNotIncreasing();
    allureReporter.endStep();
  });

  it('Verify user can discard new recording', async () => {
    allureReporter.startStep('Discard new recording flow');
    await voiceRecorder.startRecording();
    await voiceRecorder.cancelRecording();
    await voiceRecorder.assertDiscardConfirmationDialogIsShown();
    await voiceRecorder.confirmDeleteCurrentRecording();
    await voiceRecorder.assertNewVoiceNoteTitleIsDisplayed();
    allureReporter.endStep();
  });

  it('Verify user can save new recording', async () => {
    allureReporter.startStep('Save new recording and validate name');
    const draftName = await voiceRecorder.getDraftRecordingName();
    await voiceRecorder.startRecording();
    await voiceRecorder.saveRecording();
    const savedName = await voiceRecorder.getSavedRecordingName();
    await voiceRecorder.assertSavedRecordingNameIsCorrect(draftName, savedName);
    allureReporter.endStep();
  });
});
