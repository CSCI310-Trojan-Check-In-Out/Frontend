// describe('Manager Navigation', () => {
//   before(async () => {
//     await device.launchApp();
//     await device.reloadReactNative();
//   });

//   // beforeEach(async () => {
//   //   await device.reloadReactNative();
//   // });

//   it('show login screen', async () => {
//     await expect(element(by.id('loginScreen'))).toBeVisible();
//   });

//   it('empty inputs', async () => {
//     await element(by.id('loginEmail')).typeText('john@example.com');
//     await element(by.id('loginButton')).tap();
//     // await element(by.text('OK')).tap();
//     await expect(element(by.text('OK'))).toBeVisible();
//     await element(by.text('OK')).tap();
//   });

//   it('wrong username', async () => {
//     // await element(by.id('loginEmail')).typeText('2@example.com');
//     // await element(by.id('loginButton')).tap();
//   });

//   it('wrong password', async () => {});

//   it('correct password', async () => {});
// });
