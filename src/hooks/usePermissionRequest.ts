import { Permission, request } from 'react-native-permissions';

export function usePermissionRequest(
  permission: Permission,
  onAllow: () => void,
  onDeny: () => void,
  onBlocked: () => void,
): () => void {
  function requestPermission() {
    request(permission).then((permissionResult) => {
      switch (permissionResult) {
        case 'granted':
          onAllow();
          break;
        case 'denied':
          onDeny();
          break;
        case 'blocked':
          onBlocked();
          break;
      }
    });
  }

  return requestPermission;
}
