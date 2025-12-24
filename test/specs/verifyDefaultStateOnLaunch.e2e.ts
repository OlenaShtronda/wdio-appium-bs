import allureReporter from '@wdio/allure-reporter';
import voiceRecorder from '../pageobjects/VoiceRecorderPage.js';

describe('Easy Voice Recorder Tests', () => {
  it('Verify default state on launch', async () => {
    allureReporter.startStep('Check default state on launch');
    await voiceRecorder.assertRecordTabIsDisplayed();
    await voiceRecorder.assertRecordTabIsSelected();
    await voiceRecorder.assertRecordPauseButtonIsDisplayed();
    await voiceRecorder.assertRecordPauseBtnIsClickable();
    allureReporter.endStep();
  });
});