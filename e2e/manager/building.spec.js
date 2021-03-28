describe('Manager Building Screen', () => {
  before(async () => {
    await setup();
  });

  it('should show building list with some test data', async () => {
    await waitFor(element(by.id('buildingListItem')).atIndex(0))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should show building detail after tapping', async () => {
    await element(by.id('buildingListItem')).atIndex(0).tap();
    await expect(element(by.id('locationDetailQRCode'))).toBeVisible();
  });
});

async function setup() {
  await device.launchApp();
  await device.reloadReactNative();
  await element(by.id('loginEmail')).typeText('manager@usc.edu');
  await element(by.id('loginPassword')).typeText('2');
  await element(by.id('loginButton')).tap();
  await element(by.id('LocationSearch')).tap();
}
