import { RoleEnum } from "../types/RoleEnum";
import { RollResult } from "../types/RollResult";

/**
 * プレイヤーと他ユーザーの役を比較して、勝敗を返す
 * @param roleUser 
 * @param roleRival 
 * @returns 
 */
export const compareRole = (roleUser: RoleEnum, roleRival: RoleEnum): RollResult => {
    if (roleUser == roleRival) {
      return RollResult.DRAW;
    }
  
    if (roleUser < roleRival) {
      return RollResult.LOSE;
    }
  
    return RollResult.WIN;
  }