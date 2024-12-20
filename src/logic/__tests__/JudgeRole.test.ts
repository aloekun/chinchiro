/**
 * @jest-environment jsdom
 */
import { RoleEnum, getRoleStr } from "../../types/RoleEnum"
import {ErrorJudge, judgeRole} from "../JudgeRole"

test("ヒフミチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,2,3]);

    const rollStr = getRoleStr(roll);
    const targetStr = getRoleStr(RoleEnum.HIFUMI);
    expect(rollStr).toBe(targetStr);
});

test("シゴロチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([4,5,6]);

    const rollStr = getRoleStr(roll);
    const targetStr = getRoleStr(RoleEnum.SHIGORO);
    expect(rollStr).toBe(targetStr);
});

test("アラシチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([3,3,3]);

    const rollStr = getRoleStr(roll);
    const targetStr = getRoleStr(RoleEnum.ARASHI);
    expect(rollStr).toBe(targetStr);
});

test("ピンゾロチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,1,1]);

    const rollStr = getRoleStr(roll);
    const targetStr = getRoleStr(RoleEnum.PINZORO);
    expect(rollStr).toBe(targetStr);
});

test("2つの目が同じ、残り1つチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([2,2,5]);

    const rollStr = getRoleStr(roll);
    const targetStr = getRoleStr(RoleEnum.ONLY_ONE_ROLL);
    expect(rollStr).toBe(targetStr);
    expect(dice).toBe(5);
});

test("目無しチェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,2,5]);

    const rollStr = getRoleStr(roll);
    const targetStr = getRoleStr(RoleEnum.MENASHI);
    expect(rollStr).toBe(targetStr);
});

test("ダイス不足チェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,1]);

    expect(errorJudge).toBe(ErrorJudge.DICE_NUM_NOT_MUCH);
});

test("ダイス過剰チェック", () => {
    const [roll, dice, errorJudge] = judgeRole([1,2,3,4,5,6]);

    expect(errorJudge).toBe(ErrorJudge.DICE_NUM_NOT_MUCH);
});