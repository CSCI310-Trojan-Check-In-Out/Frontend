describe('Manager Navigation', () => {

  before(async () => {
    await setup();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('click home tab', async () => {
    //await element(by.id('loginButton')).tap();
    //await expect(element(by.id('managerHome'))).toBeVisible();
  });

  it('click location search tab', async () => {
    
  });

  it('click visit history tab', async () => {
    
  });

  it('click profile tab', async () => {
    
  });

  //home tab
  it('click remove pin button', async () => {
    //await element(by.id('removeFromPin')).tap();
    //await expect(element(by.id('managerHome'))).toBeVisible();
  });

  it('click building', async () => {
    //await element(by.id('buildingListItem')).tap();
    //await expect(element(by.id('locationDetail'))).toBeVisible();
  });

  it('click pin to home', async () => {
    await element(by.id('pinQRCode')).tap();
    await expect(element(by.id('locationDetail'))).toBeVisible();
  });
  
  
});

async function setup() {
  await device.launchApp();
  await device.reloadReactNative();
  await element(by.id('loginEmail')).typeText('huan773@usc.edu');
  await element(by.id('loginPassword')).typeText('1');
  await element(by.id('loginButton')).tap();
}
