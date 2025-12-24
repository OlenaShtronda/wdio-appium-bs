import allureReporter from '@wdio/allure-reporter';
import voiceRecorder from '../pageobjects/VoiceRecorderPage.js';

describe('Easy Voice Recorder Tests', () => {
  it('Verify user can save new recording', async () => {
    allureReporter.startStep('Save new recording and validate name');
    const draftName = await voiceRecorder.getDraftRecordingName();
    await voiceRecorder.startRecording();
    await voiceRecorder.handleOnboardingAndPermissions();
    await voiceRecorder.pauseRecording();
    await voiceRecorder.saveRecording();
    const savedName = await voiceRecorder.getSavedRecordingName();
    await voiceRecorder.assertSavedRecordingNameIsCorrect(draftName, savedName);
    allureReporter.endStep();
  });
});