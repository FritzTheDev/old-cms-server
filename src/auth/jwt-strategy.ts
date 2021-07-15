import { User } from '@prisma/client';
import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { prisma } from '../database/prisma';
import { JWTPayload } from '../interfaces/jwt-payload-interface';

const opts: StrategyOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  issuer: process.env.NODE_ENV === 'production' && 'api.thrilledreviews.com',
  audience: process.env.NODE_ENV === 'production' && 'app.thrilledreviews.com',
};

passport.use(
  new Strategy(opts, async ({ id }: JWTPayload, done) => {
    let user: User;
    try {
      user = await prisma.user.findUnique({ where: { id: Number(id) } });
      return done(undefined, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
