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
import banPropsOnHost from "./ban-props-on-host";
import requireEventEmitterType from "./require-event-emitter-type";
import strictBooleanAttributes from "./strict-boolean-attributes";

export default {
  "ban-props-on-host": banPropsOnHost,
  "require-event-emitter-type": requireEventEmitterType,
  "strict-boolean-attributes": strictBooleanAttributes
}
