import Page from './BasePage.js';

class VoiceRecorder extends Page {
  private readonly recordPauseBtn = 'id=com.coffeebeanventures.easyvoicerecorder:id/record_pause_button';
  private readonly recordTab = 'android=new UiSelector().text("RECORD")';
  private readonly timer = 'id=com.coffeebeanventures.easyvoicerecorder:id/elapsed_recording_time';
  private readonly recordingStatus = 'id=com.coffeebeanventures.easyvoicerecorder:id/paused_indicator';
  private readonly cancelBtn = 'id=com.coffeebeanventures.easyvoicerecorder:id/cancel_button';
  private readonly doneBtn = 'id=com.coffeebeanventures.easyvoicerecorder:id/done_button';
  private readonly confirmDeleteYesBtn = 'id=android:id/button1';
  private readonly confirmDeleteNoBtn = 'id=android:id/button2';
  private readonly newVoiceNoteTitle = 'android=new UiSelector().text("New voice note")';
  private readonly newRecordingName = 'id=com.coffeebeanventures.easyvoicerecorder:id/next_recording_editable_file_name';
  private readonly savedRecordingName = 'id=com.coffeebeanventures.easyvoicerecorder:id/finished_recording_name';

  /* ===================== ACTIONS ===================== */

  public async startRecording(): Promise<void> {
    await this.clickElement(this.recordPauseBtn);
    await browser.pause(5000);
  }

  public async pauseRecording(): Promise<void> {
    await this.clickElement(this.recordPauseBtn);
  }

  public async cancelRecording(): Promise<void> {
    await this.clickElement(this.cancelBtn);
  }

  public async saveRecording(): Promise<void> {
    await this.clickElement(this.doneBtn);
  }

  public async confirmDeleteCurrentRecording(): Promise<void> {
    await this.clickElement(this.confirmDeleteYesBtn);
  }

  public async getDraftRecordingName(): Promise<string> {
    return await this.getElementText(this.newRecordingName);
  }

  public async getSavedRecordingName(): Promise<string> {
    return await this.getElementText(this.savedRecordingName);
  }

  /* ===================== ASSERTIONS ===================== */

  public async assertRecordTabIsDisplayed(): Promise<void> {
    await this.waitUntilElementDisplayed(this.recordTab);
    await expect(await this.isElementDisplayed(this.recordTab)).toBe(true);
  }

  public async assertRecordTabIsSelected(): Promise<void> {
    const el = await this.getElement(this.recordTab);
    await expect(el).toHaveAttribute('selected', 'true');
  }

  public async assertRecordPauseButtonIsDisplayed(): Promise<void> {
    await this.waitUntilElementDisplayed(this.recordPauseBtn);
    await expect(await this.isElementDisplayed(this.recordPauseBtn)).toBe(true);
  }

  public async assertRecordPauseBtnIsClickable(): Promise<void> {
    const el = await this.getElement(this.recordPauseBtn);
    await expect(el).toHaveAttribute('clickable', 'true');
  }

  public async assertRecordPauseBtnIsInRecordingMode(): Promise<void> {
    const el = await this.getElement(this.recordPauseBtn);
    await expect(el).toHaveAttribute('content-desc', 'Pause');
  }

  public async assertRecordPauseBtnIsInPauseMode(): Promise<void> {
    const el = await this.getElement(this.recordPauseBtn);
    await expect(el).toHaveAttribute('content-desc', 'Resume recording');
  }

  public async assertRecordingTimeIsIncreasing(minSeconds: number = 1): Promise<void> {
    const timeText = await this.getElementText(this.timer);
    const [minutes, seconds] = timeText.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;

    await expect(totalSeconds).toBeGreaterThanOrEqual(minSeconds);
  }

  public async assertRecordingTimeIsNotIncreasing(): Promise<void> {
    const time1 = await this.getElementText(this.timer);
    await browser.pause(1500);
    const time2 = await this.getElementText(this.timer);

    await expect(time2).toBe(time1);
  }

  public async assertRecordingIsPaused(): Promise<void> {
    const status = await this.getElementText(this.recordingStatus);
    await expect(status).toBe('PAUSED');
  }

  public async assertDiscardConfirmationDialogIsShown(): Promise<void> {
    await this.waitUntilElementDisplayed(this.confirmDeleteYesBtn);
    await this.waitUntilElementDisplayed(this.confirmDeleteNoBtn);

    await expect(await this.isElementDisplayed(this.confirmDeleteYesBtn)).toBe(true);
    await expect(await this.isElementDisplayed(this.confirmDeleteNoBtn)).toBe(true);
  }

  public async assertNewVoiceNoteTitleIsDisplayed(): Promise<void> {
    await this.waitUntilElementDisplayed(this.newVoiceNoteTitle);
    await expect(await this.isElementDisplayed(this.newVoiceNoteTitle)).toBe(true);
  }

  public async assertSavedRecordingNameIsCorrect(draftName: string, savedName: string): Promise<void> {
    await expect(draftName).toStrictEqual(savedName.replace(/\.m4a$/, ''));
  }
}

export default new VoiceRecorder();
