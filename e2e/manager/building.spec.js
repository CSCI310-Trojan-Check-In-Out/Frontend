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

  /* -------------------------------------------------------------------------- */
  /*                               update capacity                              */
  /* -------------------------------------------------------------------------- */

  it('should show update capacity screen', async () => {
    await element(by.id('locationDetailUpdateCapacity')).tap();
    await expect(element(by.id('updateCapacityScreen'))).toBeVisible();
  });

  it('should show error message after entering negative number', async () => {
    await element(by.id('currentCapacity')).typeText('-1');
    await element(by.id('currentCapacityUpdateButton')).tap();
    await expect(
      element(by.id('Please enter a positive integer!')),
    ).toBeVisible();
  });

  it('should show error message after entering non-integer', async () => {
    await element(by.id('currentCapacity')).clearText();
    await element(by.id('currentCapacity')).typeText('100.5');
    await element(by.id('currentCapacityUpdateButton')).tap();
    await expect(
      element(by.id('Please enter a positive integer!')),
    ).toBeVisible();
  });

  it('should show error message after submitting empty inputs', async () => {
    await element(by.id('currentCapacity')).clearText();
    await element(by.id('currentCapacityUpdateButton')).tap();
    await expect(element(by.id('Capacity cannot be empty!'))).toBeVisible();
  });

  // it('should show error message after submitting capacity smaller than current capacity', async () => {
  //   await element(by.id('currentCapacity')).clearText();
  //   await element(by.id('currentCapacity')).typeText('1');
  //   await element(by.id('currentCapacityUpdateButton')).tap();
  //   await expect(
  //     element(
  //       by.id(
  //         'New Capacity cannot be smaller than the current number of people in the building!',
  //       ),
  //     ),
  //   ).toBeVisible();
  // });

  it('should succeed after entering correct number', async () => {
    await element(by.id('currentCapacity')).typeText('110');
    await element(by.id('currentCapacityUpdateButton')).tap();
    await expect(
      element(by.id('Capacity successfully updated!')),
    ).toBeVisible();
  });

  //   /* -------------------------------------------------------------------------- */
  //   /*                                   QRCode                                   */
  //   /* -------------------------------------------------------------------------- */

  it('should show QR Code after pinning to home', async () => {
    await device.pressBack();
    await device.pressBack();
    await element(by.id('locationDetailPinQRCode')).tap();
    await element(by.text('OK')).tap();
    await element(by.id('Home')).tap();
    await expect(element(by.id('managerHomeQRCode'))).toBeVisible();
  });

  it('should remove QR Code after removing from home', async () => {
    await device.pressBack();
    await element(by.id('locationDetailPinQRCode')).tap();
    await element(by.text('OK')).tap();
    await element(by.id('Home')).tap();
    await expect(element(by.id('managerHomeQRCode'))).toBeVisible();
  });

  it('should hide QR Code after removing from home', async () => {
    await element(by.id('managerHomeRemoveQRCode')).tap();
    await expect(element(by.id('managerHomeQRCode'))).toNotExist();
  });

  it('should hide QR Code after removing from home', async () => {
    await element(by.id('LocationSearch')).tap();
    await element(by.id('locationDetailViewStudent')).tap();

    await expect(element(by.id('studentListScreen'))).toExist();
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
