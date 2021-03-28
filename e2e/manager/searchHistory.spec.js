describe('Manager Search History', () => {
  before(async () => {
    await setup();
  });

  it('should show filter inputboxes after tapping filters', async () => {
    await element(by.id('timeFilter')).tap();
    await element(by.id('buildingFilter')).tap();
    await element(by.id('studentIDFilter')).tap();
    await element(by.id('majorFilter')).tap();
    await expect(element(by.id('timeInput'))).toBeVisible();
    await expect(element(by.id('buildingInput'))).toBeVisible();
    await expect(element(by.id('studentIDInput'))).toBeVisible();
    await expect(element(by.id('majorInput'))).toBeVisible();

  });

  it('should show search results after searching', async () => {
    await element(by.id('searchBar')).typeText('Tommy');
    await device.pressBack();
    await element(by.id('buildingInput')).typeText('S');
    await device.pressBack();
    await element(by.id('buildingFilter')).tap();
    await element(by.id('studentIDInput')).typeText('');
    await device.pressBack();
    await element(by.id('studentIDFilter')).tap();
    await element(by.id('majorInput')).typeText('C');
    await device.pressBack();
    await element(by.id('majorFilter')).tap();
    await element(by.id('visitHistorySearchButton')).tap();
    await expect(element(by.id('VisitHistoryResult'))).toBeVisible();

  });
  
  /*
  it('should show change time text after changing time stamps ', async () => {
    await device.pressBack();
    await element(by.id('buildingFilter')).tap();
    await element(by.id('studentIDFilter')).tap();
    await element(by.id('majorFilter')).tap();
    
    await element(by.id('startDateFilter')).tap();
    await element(by.text('OK')).tap();
    await element(by.id('startTimeFilter')).tap();
    await element(by.text('OK')).tap();
    await element(by.id('endDateFilter')).tap();
    await element(by.text('OK')).tap();
    await element(by.id('endTimeFilter')).tap();
    await element(by.text('OK')).tap();

    await expect(element(by.id('timeText'))).toBeVisible();

  });
*/
  

});

async function setup() {
  await device.launchApp();
  await device.reloadReactNative();
  await element(by.id('loginEmail')).typeText('manager@usc.edu');
  await element(by.id('loginPassword')).typeText('2');
  await element(by.id('loginButton')).tap();
  await element(by.id('VisitHistory')).tap();
}
