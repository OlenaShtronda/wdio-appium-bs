import allureReporter from '@wdio/allure-reporter';
import voiceRecorder from '../pageobjects/VoiceRecorderPage.js';

describe('Easy Voice Recorder Tests', () => {
  it('Verify user can start recording', async () => {
    allureReporter.startStep('Start recording and check status');
    await voiceRecorder.startRecording();
    await voiceRecorder.handleOnboardingAndPermissions();
    await voiceRecorder.assertRecordPauseBtnIsInRecordingMode();
    await voiceRecorder.assertRecordingTimeIsIncreasing();
    allureReporter.endStep();
  });
});