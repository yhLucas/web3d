package com.company.project.util;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.apache.commons.codec.binary.Base64OutputStream;
import org.apache.commons.codec.digest.DigestUtils;

public class PasswordEncode {
    public final static String MD5 = "MD5";
    public final static String NONE = "NONE";
    public final static String SHA_256 = "SHA-256";
    public final static String SHA_512 = "SHA-512";
    public final static String SHA_384 = "SHA-384";
    /**
     * 加密密码算法
     * @param pass
     *            需要加密的原始密码
     * @param algorithm
     *            加密算法名称
     * @return 加密后的密码
     * @throws NoSuchAlgorithmException
     *             当加密算法不可用时抛出此异常
     */
    public static String digestString(String password, String alg) throws NoSuchAlgorithmException {
        String newPass;
        if (alg == null || MD5.equals(alg)) {
            newPass = DigestUtils.md5Hex(password);
        } else if (NONE.equals(alg)) {
            newPass = password;
        } else if (SHA_256.equals(alg)) {
            newPass = DigestUtils.sha256Hex(password);
        } else if (SHA_384.equals(alg)) {
            newPass = DigestUtils.sha384Hex(password);
        } else if (SHA_512.equals(alg)) {
            newPass = DigestUtils.sha512Hex(password);
        } else {
            newPass = DigestUtils.shaHex(password);
        }
        return newPass;
    }

    /**
     * 加密密码算法，默认的加密算法是MD5
     * @param password
     *            未加密的密码
     * @return String 加密后的密码
     */
    public static String digestPassword(String password) {
        try {
            if (password != null && !"".equals(password)) {
                return digestString(password, MD5);
            } else
                return null;
        } catch (NoSuchAlgorithmException nsae) {
            throw new RuntimeException("Security error: " + nsae);
        }
    }

    /**
     * 判断密码是不是相等，默认的加密算法是MD5
     * @param beforePwd
     *            要判断的密码
     * @param afterPwd
     *            加密后的数据库密码
     * @return Boolean true 密码相等
     */
    public static boolean isPasswordEnable(String beforePwd, String afterPwd) {
        System.out.println(beforePwd+"   "+afterPwd);
        if (beforePwd != null && !"".equals(beforePwd)) {
            String password = digestPassword(beforePwd);
            return afterPwd.equals(password);
        } else
            return false;
    }

    public static void main(String[] args) throws NoSuchAlgorithmException {
        System.out.println(PasswordEncode.digestPassword("123456"));
        System.out.println(PasswordEncode.digestString("123456", PasswordEncode.MD5));
        System.out.println(PasswordEncode.isPasswordEnable("123456", PasswordEncode.digestPassword("123456")));
    }
}