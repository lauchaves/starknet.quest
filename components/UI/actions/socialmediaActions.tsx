import React, { FunctionComponent, useEffect, useState } from "react";
import ClickableDiscordIcon from "./clickable/clickableDiscordIcon";
import ClickableGithubIcon from "./clickable/clickableGithubIcon";
import ClickableTwitterIcon from "./clickable/clickableTwitterIcon";
import { isStarkRootDomain } from "starknetid.js/packages/core/dist/utils";
import { cairo } from "starknet";

type SocialMediaActionsProps = {
  identity: Identity;
};

const SocialMediaActions: FunctionComponent<SocialMediaActionsProps> = ({
  identity,
}) => {
  const [twitter, setTwitter] = useState<string | undefined>();
  const [discord, setDiscord] = useState<string | undefined>();
  const [github, setGithub] = useState<string | undefined>();

  useEffect(() => {
    if (isStarkRootDomain(identity?.domain.domain)) {
      identity?.verifier_data?.forEach((verifier) => {
        if (cairo.felt(verifier.field) === cairo.felt("twitter") && verifier.data) {
          setTwitter(verifier.data);
        }
        if (cairo.felt(verifier.field) === cairo.felt("discord") && verifier.data) {
          setDiscord(verifier.data);
        }
        if (cairo.felt(verifier.field) === cairo.felt("github") && verifier.data) {
          setGithub(verifier.data);
        }
      });
    }
  }, [identity]);

  return (
    <div className="flex flex-row justify-evenly items-center gap-3">
      {twitter ? (
        <ClickableTwitterIcon
          width="16"
          domain={identity?.domain.domain}
          twitterId={twitter}
        />
      ) : null}

      {discord ? (
        <ClickableDiscordIcon
          width="16"
          domain={identity?.domain.domain}
          discordId={discord}
        />
      ) : null}

      {github ? (
        <ClickableGithubIcon
          width="16"
          domain={identity?.domain.domain}
          githubId={github}
        />
      ) : null}
    </div>
  );
};

export default SocialMediaActions;
