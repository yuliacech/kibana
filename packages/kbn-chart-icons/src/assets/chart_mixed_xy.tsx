/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { EuiIconProps } from '@elastic/eui';
import { colors } from './common_styles';
import { ChartIconWrapper } from './icon_simple_wrapper';

export const IconChartMixedXy = (props: Omit<EuiIconProps, 'type'>) => (
  <ChartIconWrapper {...props}>
    <path
      d="M24 16l.186-.002.345-.02.266-.03.334-.058.193-.043.25-.067.223-.07.215-.074.209-.079.305-.124c.166-.07.34-.148.524-.234l.285-.135 1.202-.588c.428-.203.728-.326.966-.396.146-.044.27-.067.384-.076L30 14v7a1 1 0 01-1 1H1a1 1 0 01-1-1v-2c1 0 3.5-4 6-4s5 3 6 3 3.23-7.994 5.865-7.997L19.032 10l.541 1.205.272.595.29.612c.517 1.069.955 1.842 1.391 2.391.08.1.16.194.241.28.095.101.189.191.283.272l.143.114c.218.164.446.284.69.368.207.071.426.116.662.14l.14.012.154.008L24 16zm6-12v6l-.186.002-.345.02-.266.03-.331.057-.196.044-.25.067-.304.097-.134.047a9.492 9.492 0 00-.386.15l-.128.053c-.166.07-.34.148-.524.234l-.285.135-1.264.618-.352.159-.187.078-.256.095-.178.054a13.872 13.872 0 01-.38-.687l-.16-.311-.233-.47-.016-.472H24c1 0 3-6 6-6z"
      className={colors.accent}
    />
    <path
      d="M30 13c-.507 0-.988.146-1.89.571l-1.209.592C25.621 14.78 24.924 15 24 15c-1.384 0-2.003-.865-3.516-4.206l-.637-1.42-.346-.749-.213-.445C18.572 6.698 18.127 6 18 6c-.466 0-.967.252-1.99.997l-.891.659-.458.325C13.576 8.728 12.907 9 12 9c-1.269 0-1.966-.69-3.492-2.939l-.774-1.146-.272-.387-.26-.358C6.581 3.342 6.213 3 6 3c-.294 0-.885.651-2.017 2.33l-.491.731-.326.475C1.859 8.409 1.175 9 0 9V7c.294 0 .885-.651 2.017-2.33l.491-.731.326-.475C4.141 1.591 4.825 1 6 1c1.269 0 1.966.69 3.492 2.939l.774 1.146.272.387.26.358C11.419 6.658 11.788 7 12 7c.466 0 .967-.252 1.99-.997l.891-.659.458-.325C16.424 4.272 17.093 4 18 4c1.384 0 2.003.865 3.516 4.206l.637 1.42.346.749.213.445C23.428 12.302 23.873 13 24 13c.507 0 .988-.146 1.89-.571l1.209-.592C28.379 11.22 29.076 11 30 11v2z"
      className={colors.subdued}
    />
    <path
      d="M6 13v7.889C6 21.503 5.552 22 5 22H1c-.552 0-1-.497-1-1.111V13a1 1 0 011-1h4a1 1 0 011 1zm8-1v9a1 1 0 01-1 1H9a1 1 0 01-1-1v-9a1 1 0 011-1h4a1 1 0 011 1zm8 5v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1zm8 2v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2a1 1 0 011-1h4a1 1 0 011 1z"
      className={colors.subdued}
    />
  </ChartIconWrapper>
);
