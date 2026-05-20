import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchService {
    computeMatch(candidato: any, vacante: any) {
        const skillsReq: string[] = Array.isArray(vacante.skills_requeridas) ? vacante.skills_requeridas : [];
        const skillsCand: string[] = Array.isArray(candidato.skills) ? candidato.skills : [];

        let matchCount = 0;
        for (const s of skillsReq) {
            if (skillsCand.includes(s)) matchCount++;
        }
        const cobertura_skills = skillsReq.length === 0 ? 1 : matchCount / skillsReq.length;

        const brecha_experiencia = Math.max(0, (vacante.experiencia_min || 0) - (candidato.experiencia_anios || 0));

        let bonusDisponibles: any = {
            'indefinido': 10,
            'obra_labor': 5,
            'prestacion_servicios': 0,
        }

        let bonus = bonusDisponibles[vacante.tipo_contrato] || 0;

        let score = Math.round(cobertura_skills * 70 + Math.max(0, 1 - brecha_experiencia / 5) * 20 + bonus);
        score = Math.min(score, 100);

        let categoria = '';
        if (score < 40) categoria = 'NO_FIT';
        else if (score < 65) categoria = 'MAYBE';
        else if (score < 85) categoria = 'GOOD_FIT';
        else categoria = 'EXCELLENT_FIT';

        const razones: string[] = [];
        const porcentaje = Math.round(cobertura_skills * 100);
        skillsReq.length == 0 ? razones.push(`Sin skills requeridas (100%)`) : razones.push(`Cobertura de skills ${matchCount}/${skillsReq.length} (${porcentaje}%)`);

        if (brecha_experiencia > 0) {
            razones.push(`Brecha de experiencia: ${brecha_experiencia} año${brecha_experiencia > 1 ? 's' : ''} (penalización aplicada)`);
        }
        if (bonus > 0) {
            const contratoName = vacante.tipo_contrato === 'indefinido' ? 'indefinido' : vacante.tipo_contrato === 'obra_labor' ? 'obra labor' : 'prestación de servicios';
            // Mensaje equivalente al ejemplo
            const friendly = `Contrato ${contratoName} suma ${bonus} puntos`;
            razones.push(friendly);
        }

        const finalRazones = razones.slice(0, 3);

        return {
            score,
            categoria,
            cobertura_skills,
            brecha_experiencia,
            razones: finalRazones,
        };
    }
}
