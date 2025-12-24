import allureReporter from '@wdio/allure-reporter';
import voiceRecorder from '../pageobjects/VoiceRecorderPage.js';

describe('Easy Voice Recorder Tests', () => {
  it.only('Verify user can pause recording', async () => {
    allureReporter.startStep('Pause recording and check status');
    await voiceRecorder.startRecording();
    await voiceRecorder.handleOnboardingAndPermissions();
    await voiceRecorder.pauseRecording();
    await voiceRecorder.assertRecordPauseBtnIsInPauseMode();
    await voiceRecorder.assertRecordingIsPaused();
    await voiceRecorder.assertRecordingTimeIsNotIncreasing();
    allureReporter.endStep();
  });
});