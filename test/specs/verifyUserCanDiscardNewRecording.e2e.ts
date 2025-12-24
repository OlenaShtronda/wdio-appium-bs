import allureReporter from '@wdio/allure-reporter';
import voiceRecorder from '../pageobjects/VoiceRecorderPage.js';

describe('Easy Voice Recorder Tests', () => {
  it('Verify user can discard new recording', async () => {
    allureReporter.startStep('Discard new recording flow');
    await voiceRecorder.startRecording();
    await voiceRecorder.handleOnboardingAndPermissions();
    await voiceRecorder.pauseRecording();
    await voiceRecorder.cancelRecording();
    await voiceRecorder.assertDiscardConfirmationDialogIsShown();
    await voiceRecorder.confirmDeleteCurrentRecording();
    await voiceRecorder.assertNewVoiceNoteTitleIsDisplayed();
    allureReporter.endStep();
  });
});