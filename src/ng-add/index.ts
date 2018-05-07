import { chain, noop, Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { addModuleImportToRootModule } from '../utils/ast';
import { getProjectFromWorkspace, getWorkspace, Project, Workspace } from '../utils/devkit-utils/config';
import { zorroVersion } from '../utils/lib-versions';
import { addPackageToPackageJson } from '../utils/package';
import { Schema } from './schema';

export default function (options: Schema): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addZorroToPackageJson(),
    addThemeToAppStyles(options),
    addModulesToAppModule(options)
  ]);
}

/** Add material, cdk, annimations to package.json if not already present. */
function addZorroToPackageJson() {
  return (host: Tree) => {
    addPackageToPackageJson(host, 'dependencies', 'ng-zorro-antd', zorroVersion);
    return host;
  };
}

/** Add browser animation module to app.module */
function addModulesToAppModule(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
    addModuleImportToRootModule(host, 'FormsModule', '@angular/forms', project);
    addModuleImportToRootModule(host, 'HttpClientModule', '@angular/common/http', project);
    addModuleImportToRootModule(host, 'NgZorroAntdModule.forRoot()', 'ng-zorro-antd', project);

    return host;
  };
}

/** Add pre-built styles to the main project style file. */
export function addThemeToAppStyles(options: Schema): (host: Tree) => Tree {
  return function(host: Tree): Tree {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    insertPrebuiltTheme(project, host, workspace);
    return host;
  };
}

/** Insert a pre-built theme into the angular.json file. */
function insertPrebuiltTheme(project: Project, host: Tree, workspace: Workspace) {
  const themePath = `node_modules/ng-zorro-antd/src/ng-zorro-antd.less`;

  if (project.architect) {
    addStyleToTarget(project.architect['build'], host, themePath, workspace);
    addStyleToTarget(project.architect['test'], host, themePath, workspace);
  } else {
    throw new SchematicsException(`${project.name} does not have an architect configuration`);
  }
}

/** Adds a style entry to the given target. */
function addStyleToTarget(target: any, host: Tree, asset: string, workspace: Workspace) {
  const styleEntry = {input: asset};

  // We can't assume that any of these properties are defined, so safely add them as we go
  // if necessary.
  if (!target.options) {
    target.options = {styles: [styleEntry]};
  } else if (!target.options.styles) {
    target.options.styles = [styleEntry];
  } else {
    const existingStyles = target.options.styles.map(s => typeof s === 'string' ? s : s.input);
    const hasGivenTheme = existingStyles.find(s => s.includes(asset));
    const hasOtherTheme = existingStyles.find(s => s.includes('material/prebuilt'));

    if (!hasGivenTheme && !hasOtherTheme) {
      target.options.styles.splice(0, 0, styleEntry);
    }
  }

  host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}