import { MatchService } from './match.service';

describe('MatchService', () => {
  const service = new MatchService();

  it('EXCELLENT_FIT when full coverage, experiencia >= min, indefinido', () => {
    const candidato = { skills: ['a','b','c'], experiencia_anios: 5 };
    const vacante = { skills_requeridas: ['a','b','c'], experiencia_min: 3, tipo_contrato: 'indefinido' };
    const res = service.computeMatch(candidato, vacante);
    expect(res.categoria).toBe('EXCELLENT_FIT');
    expect(res.score).toBe(100);
  });

  it('NO_FIT when low coverage and experiencia very far', () => {
    const candidato = { skills: ['x'], experiencia_anios: 0 };
    const vacante = { skills_requeridas: ['a','b','c','d'], experiencia_min: 10, tipo_contrato: 'prestacion_servicios' };
    const res = service.computeMatch(candidato, vacante);
    expect(res.categoria).toBe('NO_FIT');
  });

  it('MAYBE case', () => {
    const candidato = { skills: ['a','b'], experiencia_anios: 3 };
    const vacante = { skills_requeridas: ['a','b','c','d'], experiencia_min: 5, tipo_contrato: 'prestacion_servicios' };
    const res = service.computeMatch(candidato, vacante);
    expect(res.categoria).toBe('MAYBE');
    expect(res.score).toBe(47);
  });

  it('GOOD_FIT example from spec', () => {
    const candidato = { skills: ['java','spring','sql'], experiencia_anios: 3 };
    const vacante = { skills_requeridas: ['java','spring','kafka','sql'], experiencia_min: 5, tipo_contrato: 'indefinido' };
    const res = service.computeMatch(candidato, vacante);
    expect(res.score).toBe(75);
    expect(res.categoria).toBe('GOOD_FIT');
    expect(Math.abs(res.cobertura_skills - 0.75)).toBeLessThan(0.001);
    expect(res.brecha_experiencia).toBe(2);
  });

  it('skills_requeridas empty treated as full coverage', () => {
    const candidato = { skills: ['any'], experiencia_anios: 1 };
    const vacante = { skills_requeridas: [], experiencia_min: 2, tipo_contrato: 'prestacion_servicios' };
    const res = service.computeMatch(candidato, vacante);
    expect(res.cobertura_skills).toBe(1);
  });
});
