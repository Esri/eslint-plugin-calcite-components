/* Copyright 2021 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Rule } from 'eslint';
// @ts-ignore
import { getDecorator, stencilComponentContext } from 'stencil-eslint-core';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule helps enforce the payload type to EventEmitters to avoid misleading `any` type on the CustomEvent detail object.',
      category: 'Best practices',
      recommended: true
    },
    schema: [],
    type: 'problem'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    return {
      ...stencil.rules,
      'PropertyDefinition > Decorator[expression.callee.name=Event]': (node: any) => {
        if (stencil.isComponent()) {
          console.log(node, node.parent);
          const propertyDefNode = node.parent;
          const propertyDefType = propertyDefNode.typeAnnotation;
          const typedAsEventEmitter = !!propertyDefType;

          // const emitterType = node.typeParameters;
          //
          if (!typedAsEventEmitter) {
            context.report({
              node,
              message: "Emitter not typed as `EventEmitter<CustomEventDetailsType>`"
            });
            return;
          }

          const eventEmitterType = propertyDefType.typeAnnotation.typeParameters;

          if (eventEmitterType === undefined) {
            context.report({
              node,
              message: "EventEmitter is not typed and will cause its detail object to be typed as `any`"
            });
          }
        }
      }
    };
  }
};

export default rule;
