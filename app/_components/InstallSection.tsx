"use client";
import { Button, Text, Heading, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function InstallSection() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setInstallable] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
      // Optionally show an install button or message here
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      {isInstallable ? (
        <>
          <Box mt="16">
            <Heading size="md" mb="4">
              Install Finfriend
            </Heading>
            <Text mb="4" fontWeight="400">
              Take control of your finances with Finfriend. Install now to enjoy
              a seamless user experience.
            </Text>
            <Button onClick={handleInstallClick} w="full" colorScheme="purple">
              Install Now
            </Button>
          </Box>
        </>
      ) : null}
    </>
  );
}
