import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const LocationTabIcon: React.FC = () => {
  return (
    <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"
        stroke="#f9f7f4"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 13a3 3 0 100-6 3 3 0 000 6z"
        stroke="#f9f7f4"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
