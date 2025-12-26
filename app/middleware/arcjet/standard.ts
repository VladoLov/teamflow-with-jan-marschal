import arcjet, { detectBot, shield } from "@/lib/arcjet";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { error } from "console";
import { request } from "http";
import { base } from "../base";

const buildStandardAj = () =>
  arcjet
    .withRule(
      shield({
        mode: "LIVE",
      })
    )
    .withRule(
      detectBot({
        mode: "LIVE",
        allow: [
          "CATEGORY:SEARCH_ENGINE",
          "CATEGORY:PREVIEW",
          "CATEGORY:MONITOR",
        ],
      })
    );

export const standardSecurityMiddleware = base
  .$context<{
    request: Request;
    user: KindeUser<Record<string, unknown>>;
  }>()
  .middleware(async ({ context, next, errors }) => {
    const decision = await buildStandardAj().protect(context.request, {
      userId: context.user?.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw {
          message: "Automated requests are not allowed.",
        };
      }
      if (decision.reason.isShield()) {
        throw errors.FORBIDDEN({
          message: "You do not have permission to access this resource.",
        });
      }

      throw errors.FORBIDDEN({
        message: "Request blocked",
      });
    }

    return next();
  });
