import { useCallback } from 'react';

interface IncognitoOptions {
    clearLocalStorage?: boolean;
    clearSessionStorage?: boolean;
    clearCookies?: boolean;
    redirectUrl?: string;
}

export function useIncognito() {
    const wipeData = useCallback((options: IncognitoOptions = {}) => {
        const {
            clearLocalStorage = true,
            clearSessionStorage = true,
            clearCookies = false,
            redirectUrl = 'https://www.google.com/search?q=business+news'
        } = options;

        // Step 1: Clear localStorage
        if (clearLocalStorage && typeof window !== 'undefined') {
            try {
                localStorage.clear();
                console.log('✓ localStorage cleared');
            } catch (error) {
                console.error('Failed to clear localStorage:', error);
            }
        }

        // Step 2: Clear sessionStorage
        if (clearSessionStorage && typeof window !== 'undefined') {
            try {
                sessionStorage.clear();
                console.log('✓ sessionStorage cleared');
            } catch (error) {
                console.error('Failed to clear sessionStorage:', error);
            }
        }

        // Step 3: Clear cookies (optional, more complex)
        if (clearCookies && typeof document !== 'undefined') {
            try {
                document.cookie.split(';').forEach(cookie => {
                    const name = cookie.split('=')[0].trim();
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
                });
                console.log('✓ Cookies cleared');
            } catch (error) {
                console.error('Failed to clear cookies:', error);
            }
        }

        // Step 4: Replace history to mask visit
        if (typeof window !== 'undefined') {
            // Add phantom pages to history
            const phantomPages = [
                'https://www.google.com',
                redirectUrl
            ];

            // Go back to mask current page
            window.history.replaceState(null, '', phantomPages[0]);

            // Redirect to neutral page
            setTimeout(() => {
                window.location.replace(redirectUrl);
            }, 100);
        }
    }, []);

    const quickClean = useCallback(() => {
        wipeData({
            clearLocalStorage: true,
            clearSessionStorage: true,
            clearCookies: true
        });
    }, [wipeData]);

    const autoWipeOnClose = useCallback(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', () => {
                localStorage.clear();
                sessionStorage.clear();
            });
        }
    }, []);

    return {
        wipeData,
        quickClean,
        autoWipeOnClose
    };
}
