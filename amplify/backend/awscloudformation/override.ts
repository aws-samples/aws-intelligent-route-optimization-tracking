import { AmplifyRootStackTemplate } from "@aws-amplify/cli-extensibility-helper";

export function override(resources: AmplifyRootStackTemplate) {
  const authRole = resources.authRole;

  const basePolicies = Array.isArray(authRole.policies)
    ? authRole.policies
    : [authRole.policies];

  authRole.policies = [
    ...basePolicies,
    {
      policyName: "amplify-permissions-custom-resources",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Resource:
              "arn:aws:geo:eu-west-1:536254204126:route-calculator/routecalculator_supplychain",
            Action: ["geo:CalculateRoute*"],
            Effect: "Allow",
          },
        ],
      },
    },
  ];
}