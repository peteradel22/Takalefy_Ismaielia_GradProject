import * as React from "react";

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [qrCodeUrl, setQrCodeUrl] = React.useState(null);

  React.useEffect(() => {
    // جلب حالة 2FA الحالية من API
    const fetch2FAStatus = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.takalefy.hs.vc/user-settings/2fa-status", {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${yourToken}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch 2FA status");
        const data = await res.json();
        setTwoFactorEnabled(data.enabled);
        if (data.qrCodeUrl) setQrCodeUrl(data.qrCodeUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetch2FAStatus();
  }, []);

  const enable2FA = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.takalefy.hs.vc/user-settings/2fa-enable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${yourToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to enable 2FA");
      const data = await res.json();
      setQrCodeUrl(data.qrCodeUrl);
      setTwoFactorEnabled(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const disable2FA = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.takalefy.hs.vc/user-settings/2fa-disable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${yourToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to disable 2FA");
      setTwoFactorEnabled(false);
      setQrCodeUrl(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">Security Settings</h2>
      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          <p>
            Two-Factor Authentication (2FA) is currently{" "}
            <strong>{twoFactorEnabled ? "Enabled" : "Disabled"}</strong>.
          </p>

          {twoFactorEnabled && qrCodeUrl && (
            <div className="my-4">
              <p className="mb-2">Scan this QR code with your authenticator app:</p>
              <img src={qrCodeUrl} alt="2FA QR Code" className="mx-auto" />
            </div>
          )}

          {twoFactorEnabled ? (
            <button
              onClick={disable2FA}
              disabled={loading}
              className="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
              Disable 2FA
            </button>
          ) : (
            <button
              onClick={enable2FA}
              disabled={loading}
              className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
            >
              Enable 2FA
            </button>
          )}
        </>
      )}
    </div>
  );
}
