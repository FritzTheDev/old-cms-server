/**
 * Filename: user/user-controller.ts
 * Last Editor: Frederick Johnson (FritzTheDev)
 * Last Edited: 7/12/21
 * Description: Handles routing & controller logic for users.
 */
import { Router } from 'express';

export interface Controller {
  path: string;
  router: Router;
}
