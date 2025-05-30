const handleContinue = async () => {
    try {
      await updateUserProfile({
        name,
        hasProfile: true,
        // Add other profile fields
      });
      // Navigation handled by AppNavigator
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };