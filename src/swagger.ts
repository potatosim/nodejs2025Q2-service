import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';
import { load } from 'js-yaml';
import { readFile } from 'fs/promises';

export const loadYamlDocument = async (
  filePath: string,
): Promise<OpenAPIObject | null> => {
  try {
    const fileContent = await readFile(filePath, 'utf8');
    return load(fileContent);
  } catch (e) {
    console.error('Error loading YAML file:', e);
    return null;
  }
};

export const setupSwagger = async (app: INestApplication, yamlPath: string) => {
  const yamlDocument = await loadYamlDocument(yamlPath);

  if (!yamlDocument) {
    console.error('Failed to load YAML document.');
    return;
  }
  SwaggerModule.setup('doc', app, yamlDocument);
};
