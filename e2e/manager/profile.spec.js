

    before(async () => {
        await setup();
        await element(by.id('Profile')).tap();
      });
      
    it('logoutYes', async () => {
        await element(by.id('log-out-outline')).tap();
        await element(by.id('Yes')).tap();
        await expect(element(by.id('loginScreen'))).toBeVisible();

    });

    it('logoutNo', async () => {
        await setup();
        await element(by.id('Profile')).tap();   // "Profile" refers to the profile tab
        await element(by.id('log-out-outline')).tap();
        await element(by.id('No')).tap();
        await expect(element(by.id('Profile1'))).toBeVisible();  // "Profile1" refers to the profile screen

    });

    it('deleteAccountNo', async () => {
        await setup();
        await element(by.id('Profile')).tap();
        await element(by.id('close-outline')).tap();
        await element(by.id('No')).tap();
        await expect(element(by.id('Profile1'))).toBeVisible();
    });

    it('updatePhotoNavigation', async () => {
        await setup();
        await element(by.id('Profile')).tap();
        await element(by.id('camera-outline')).tap();
        await expect(element(by.id('Camera'))).toBeVisible();
    });

    //it('updatePhotoSnap', async () => {
        //await element(by.id('snap')).tap();
        //await expect(element(by.id('Profile1'))).toBeVisible();
    //});

    it('changePasswordNavigation', async () => {
        await setup();
        await element(by.id('Profile')).tap();
        await element(by.id('key-outline')).tap();
        await expect(element(by.id('ChangePassword'))).toBeVisible();
    });

    it('changePasswordCancel', async () => {
       
        await element(by.id('currentPassword')).typeText('2');
        await element(by.id('newPassword')).typeText('2');
        await element(by.id('comfirmNewPassword')).typeText('2');
        await element(by.id('changePasswordCancel')).tap();
        await expect(element(by.id('Profile1'))).toBeVisible();
    });
      
      
      // beforeEach(async () => {
      //   await device.reloadReactNative();
      // });
      
      //   // it('should /login screen', async () => {
      //   //   await expect(element(by.id('password'))).toBeVisible();
      //   // });
      
      //   // it('should have welcome screen', async () => {
      //   //   // await expect(element(by.id('password'))).toBeVisible();
      //   // });
      
      //   // it('should show hello screen after tap', async () => {
      //   //   await element(by.id('hello_button')).tap();
      //   //   await expect(element(by.text('Hello!!!'))).toBeVisible();
      //   // });
      
      // it('should show world screen after tap', async () => {
      //   await element(by.id('world_button')).tap();
      //   await expect(element(by.text('World!!!'))).toBeVisible();
      // });
      
      async function setup() {
        await device.launchApp();
        await device.reloadReactNative();
        await element(by.id('loginEmail')).typeText('manager@usc.edu');
        await element(by.id('loginPassword')).typeText('2');
        await element(by.id('loginButton')).tap();
      }
      