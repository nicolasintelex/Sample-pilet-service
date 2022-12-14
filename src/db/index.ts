import { Pilet } from '../types';

const fs = require('fs');
const piletData: Record<string, Record<string, Pilet>> = JSON.parse(fs.readFileSync('./pilets.json', 'utf8'));

export async function getPilets(): Promise<Array<Pilet>> {
  
  const pilets: Array<Pilet> = [];

  Object.keys(piletData).forEach(name =>
    Object.keys(piletData[name]).forEach(version => {
      const pilet = piletData[name][version];
      pilets.push(pilet);
    }),
  );

  return pilets;
}

export async function getPilet(name: string, version: string): Promise<Pilet | undefined> {
  const versions = piletData[name] || {};
  return versions[version];
}

export async function setPilet(pilet: Pilet) {
  const meta = pilet.meta;
  const current = piletData[meta.name] || {};
  
  piletData[meta.name] = {
    ...current,
    [meta.version]: pilet,
  }

  fs.writeFileSync('./pilets.json', JSON.stringify(piletData))

}
